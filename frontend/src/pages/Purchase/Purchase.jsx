
import  styles from './Purchase.module.css'
import { uploads } from '../../utils/config';

// components
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Hooks
import { forwardRef, useState, useEffect, useMemo, } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, buyProduct, reset } from '../../slices/productsSlice'; 


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Purchase = () => {
  const noImage = 'https://image.shutterstock.com/image-vector/prohibition-no-photo-sign-vector-260nw-449151856.jpg'


  const [listProducts, setListProducts] = useState({})
  const [qty, setQty] = useState('')


  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const dispatch = useDispatch() 

  const { products,loading,message,error } = useSelector((state) => state.products)


  // load data
  useEffect(() => {    
    dispatch(getProducts())
  },[dispatch])

  useMemo(() => {
    if(products.length > 0){
      setListProducts(products)
    }
    
  },[products])


  // Function to format value in BRL
  const formatCurrency = (valueCurrency) => {
    return parseFloat(valueCurrency).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  });
   } 

  
  const handleBuy = (id) => {
    const cart = {
      productId: id,
      qty,
    }
    
    dispatch(buyProduct(cart))

    setTimeout(() => {
      dispatch(reset())
  }, 4000)
  }

 

  useEffect(() =>{
    if(message !== null){
      setOpenSuccess(true)
    }
    if(error !== null){
      setOpenError(true)
    }  
  },[message,error])   


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false) 
    setOpenError(false)   
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
         <h1>Simulador simples de compra</h1>
         <h2>Simulador apenas para demonstrar a baixa no estoque</h2>        
      </div> 
      
      <div className={styles.middleDiv}>      
        <div className={styles.products_list}>
          {listProducts.length > 0 && listProducts.map((product) => ( 
            <div className={styles.product} key={product._id}>
              <span className={styles.span_title}>
                <h2>{product.name}</h2>
              </span>            
              <span className={styles.span_img}>
                <img src={product.image ? `${uploads}/products/${product.image}` : noImage} alt="Imagem do produto" />
              </span>
              <span className={styles.span_description}>
                <p>{product.description}</p>
              </span> 
              <span className={styles.span_price}>
                <p>{formatCurrency(product.price)}</p>
              </span> 
              {parseFloat(product.qtyStock) <= 0 ? (              
                <span className={styles.span_out_stock}>
                  <p>Esgotado!</p>
                </span>
              ) : (
                <>
                <span className={styles.span_qty}>              
                  <TextField 
                  name='qtd'            
                  label="Quantidade desejada (KG)"
                  onChange={(e) => setQty(e.target.value)}
                  type="number"                
                  fullWidth={true}              
                />            
                
                </span>
                <span className={styles.span_btn_buy}>
                  <LoadingButton
                      type='submit'
                      color="primary"
                      loading={loading}
                      variant="contained"
                      onClick={() => handleBuy(product._id)}
                      size="large"                    
                      fullWidth={true}
                      >
                      Comprar
                  </LoadingButton> 
                </span> 
                </>
              )}
            </div>
          ))}          
        </div> 
      </div> 
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {message}
        </Alert>        
      </Snackbar>    
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         {error}
        </Alert>        
      </Snackbar>  
    </div>
  )
}
