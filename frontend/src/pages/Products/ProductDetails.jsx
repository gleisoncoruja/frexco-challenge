import styles from './ProductDetails.module.css'

import { uploads } from '../../utils/config';
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

// Components
import { Alert,} from '@mui/material';
import { LoadBackDrop } from '../../components/backDrop/LoadBackDrop';

// hooks
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../slices/categorySlice'
import { getProductById,  reset } from '../../slices/productsSlice'; 

export const ProductDetails = () => {
  const {id} = useParams();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [qtyStock, setStock] = useState(0)
  const [categoryId, setCategoryId] = useState('')
  const [image,setImage] = useState('')
  const [createdAt, setCreatedAt] =  useState('')
  const [updatedAt, setUpdatedAt] =  useState('')

  const [listCategories, setListCategories] = useState({})
  const [listSales, setListSales] = useState([])
  

  const noImage = 'https://image.shutterstock.com/image-vector/prohibition-no-photo-sign-vector-260nw-449151856.jpg'

  const dispatch = useDispatch() 

  const { categories } = useSelector((state) => state.categories)
  const { product,loading,message } = useSelector((state) => state.products)

  // load data
  useEffect(() => {    
    dispatch(getProductById(id))
    dispatch(getCategories())
    dispatch(reset())
  },[dispatch,id])

  useMemo(() => {
    if(categories.length > 0){
      setListCategories(categories)
    }

    if(product){
      setListSales(product.sales)
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setStock(product.qtyStock)
      setCategoryId(product.categoryId)
      setImage(product.image)
      setCreatedAt(product.createdAt)
      setUpdatedAt(product.updatedAt)
    }
    
      
    
    
  },[categories,product])
  
 

  // Function tu return the name of category
  const getCategoryName = (idCategory) =>{
    if (listCategories.length > 0){
      let categoryName = ''
      categoryName = listCategories.filter((category) => category._id === idCategory)
      if (categoryName.length > 0){
        return categoryName[0].name
      } else { return ''}
      
    }
  }

  // Function to format value in BRL
  const formatCurrency = (valueCurrency) => {
    return parseFloat(valueCurrency).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
      });
   }
   
   // Function to format date
   const formatDate = (date) =>{
      const dateToFormat = new Date(date);
      return format(dateToFormat, 'dd/MM/yyyy HH:mm', { locale: ptBR })
      //
   }

   


  if (loading) {
    return <LoadBackDrop show={true} />;
  }

  


  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <div className={styles.divImage}>
          <span>
            <img src={image ? `${uploads}/products/${image}` : noImage} alt={name} />
          </span>          
        </div>
        <div className={styles.detail}>
          <span className={styles.span_product}>
            <h1>{name}</h1>
            <h2>{description}</h2>
          </span>
          
          <span className={styles.span_detail}>            
              <p>Preço - {formatCurrency(price)}</p>           
              <p>Quantidade em estoque - {qtyStock}</p>
              <p>Categoria - {categoryId && getCategoryName(categoryId)}</p>            
            
              <p>Data do cadastro - {createdAt && formatDate(createdAt)}</p>           
              <p>Ultima atualização - {updatedAt && formatDate(updatedAt)}</p>
                     
          </span>   
                
        </div>
      </div>      
      <div className={styles.middleDiv}>
      <span><h2>Detalhes das vendas</h2></span>
      {message && <Alert severity="success">{message}</Alert>}
        <div className={styles.gridDiv}>
          <table id='tableCategories'>            
              <thead>
              <tr className='tableTitle'>
                <th>Data</th>
                <th>ID do produto</th>
                <th>ID do usuário</th>
                <th>Nome do usuário</th>                
                <th>Quantidade</th>
              </tr>
              </thead>
              
            <tbody>
            {listSales && listSales.map((sale) => (             
                <tr key={sale.date} >
                  <td >{formatDate(sale.date)}</td>                  
                  <td >{sale.productId}</td>                  
                  <td >{sale.userId}</td>                 
                  <td >{sale.userName}</td>                 
                  <td >{sale.qty}</td>                 
                </tr> 
            ))}
            </tbody>
          </table>            
        </div>              
      </div>         
    </div>
  )
}
