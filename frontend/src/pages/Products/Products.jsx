import './Products.css'

import { uploads } from '../../utils/config';

// Components
import { Alert, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadBackDrop } from '../../components/backDrop/LoadBackDrop';

// hooks
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../slices/categorySlice'
import { getProducts, deleteProduct, reset } from '../../slices/productsSlice'; 



export const Products = () => {
  const [listCategories, setListCategories] = useState({})
  const [listProducts, setListProducts] = useState({})
  const [productId, setProductId] = useState('')
  const [open, setOpen] = useState(false);

  const noImage = 'https://image.shutterstock.com/image-vector/prohibition-no-photo-sign-vector-260nw-449151856.jpg'

  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const { categories } = useSelector((state) => state.categories)
  const { products,loading,message } = useSelector((state) => state.products)

  // load data
  useEffect(() => {    
    dispatch(getProducts())
    dispatch(getCategories())
    dispatch(reset())
  },[dispatch])

  useMemo(() => {
    if(categories.length > 0){
      setListCategories(categories)
    }
    if(products.length > 0){
      setListProducts(products)
    }
    
  },[categories,products])
  

  // Function to open confirm dialog
  const handleClickOpen = (id) => {
    setProductId(id)
    setOpen(true);

    
  };

   // Function to open confirm dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Delete a product by idd
  const handleDelete = async() => {
    await dispatch(deleteProduct(productId))
    setOpen(false)

    // update the products list so you don't have to make a new request
    setListProducts(listProducts.filter((product) => product._id !== productId))

    setTimeout(() => {
      dispatch(reset())
  }, 4000)
  }

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

   


  if (loading) {
    return <LoadBackDrop show={true} />;
  }

  
  

  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>Gerenciar Produtos</h1>
        <p>Aqui você poderá visualizar, inserir, editar ou excluir um produto</p>
      </div>
      
      <div className='middleDiv'>
      {message && <Alert severity="success">{message}</Alert>}
        <div className="gridDiv">
          <table id='tableCategories'>            
              <thead>
              <tr className='tableTitle'>
                <th>ID</th>
                <th>Imagem</th>
                <th>Nome</th>                
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Preço</th>             
                <th>Estoque (KG)</th>             
                <th>Ações</th>
              </tr>
              </thead>
              
            <tbody>
            {listProducts.length > 0 && listProducts.map((product) => (             
                <tr key={product._id} >
                  <td >{product._id}</td>
                  <td className='tdImage'><img src={product.image ? `${uploads}/products/${product.image}` : noImage} alt="Imagem do produto" /></td>
                  <td >{product.name}</td>                  
                  <td >{product.description}</td>
                  <td >{getCategoryName(product.categoryId) || 'Sem categoria'}</td>                  
                  <td >{formatCurrency(product.price)}</td>
                  <td >{product.qtyStock}</td>
                  <td className='tdActions'>
                    <Button variant="outlined" startIcon={<InfoIcon />} onClick={() => navigate(`details/${product._id}`)}>
                      Ver detalhes
                    </Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=> handleClickOpen(product._id)}>
                      Excluir
                    </Button>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`${product._id}`)}>
                      Editar
                    </Button>
                  </td>
                </tr> 
            ))}
            </tbody>
          </table>
            
        </div>
        <div className="addButton">
            <Fab color="primary" aria-label="add"onClick={() => navigate("new")}>
              <AddIcon />
            </Fab>
          </div>        
      </div>
      <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Tem certeza?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Essa ação não poderá ser desfeita, deseja mesmo excluir o registro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete}>Excluir</Button>
              <Button onClick={handleClose} autoFocus>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
      </div>      
    </div>
  )
}
