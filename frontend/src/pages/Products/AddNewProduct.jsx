import styles from './AddNewProduct.module.css'

// components
import {  TextField,Alert, Select, MenuItem, InputLabel, FormControl, Button  } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom'

// hooks
import { useState, useRef, useEffect, useMemo } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../slices/categorySlice'
import { addProduct,reset } from '../../slices/productsSlice';

export const AddNewProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [qtyStock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState('')
    const [image,setImage] = useState('')


    const [previewImage, setPreviewImage] = useState('')
    const [listCategories, setListCategories] = useState({})


    const inputRef = useRef()

    const noImage = 'https://image.shutterstock.com/image-vector/prohibition-no-photo-sign-vector-260nw-449151856.jpg'

    const { categories } = useSelector((state) => state.categories)
    const { error,loading,message } = useSelector((state) => state.products)

    const dispatch = useDispatch()


    // load categories data
    useEffect(() => {    
        dispatch(getCategories())
    },[dispatch])

    useMemo(() => {
        if(categories.length > 0){
          setListCategories(categories)          
        }
      },[categories])

    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const productData = {
            name,
            description,
            price,
            qtyStock,
            categoryId,
            image
        }

        // build form data, because has img
        const formData = new FormData()
        const productFormData = Object.keys(productData).forEach((key) => formData.append(key, productData[key]))

        formData.append("product",productFormData)

        dispatch(addProduct(formData))             
    }

    // Function to get the category id from selected category

    const handleGetCategoryId = (e) => {        
        setCategoryId(e.target.value)
    }

    // Clean all states
    useEffect(() => {
        if(message){
            setName('')
            setDescription('')
            
            setTimeout(() => {
                dispatch(reset())
            }, 4000)  
        } else{
            dispatch(reset())
        }
        inputRef.current.focus();        
    },[dispatch, message] )


    // Function to update image
    const handleFile  = (e) => {
        //  image preview
        const loadedImage = e.target.files[0]

        setPreviewImage(loadedImage)

        // update image state
        setImage(loadedImage)
    }
    

  return (
    <div className={styles.add}>
        <div className={styles.add_header}>
            <h1>Novo produto</h1>       
            <p>Cadastre um novo produto</p>  
        </div>      
        
        <div className={styles.add_container}>
        {message && <Alert severity="success">{message}</Alert>} 
            <form className={styles.add_form} onSubmit={handleSubmit}>
                <span className={styles.add_span}>
                <TextField 
                type="text" 
                label="Nome" 
                inputRef={inputRef}
                variant="outlined" 
                fullWidth={true}
                onChange={(e) => setName(e.target.value)}
                value={name || ''}
                required
                />
                </span>  

                <span className={styles.add_span}>
                <TextField 
                type="text" 
                label="Descrição" 
                variant="outlined" 
                fullWidth={true}
                onChange={(e) => setDescription(e.target.value)}
                value={description || ''}
                required
                />
                </span>

                <span className={styles.add_span}>
                <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categoryId}
                    label="Categoria"
                    fullWidth={true}
                    onChange={handleGetCategoryId}
                    >
                    <MenuItem value="">
                        <em>Nenhuma</em>
                    </MenuItem>
                    {listCategories.length > 0 && listCategories.map((category) => (
                       <MenuItem value={category._id} key={category._id} >{category.name}</MenuItem>
                    ))}
                    
                    </Select>                    
                </FormControl>              
                </span>

                <span className={styles.add_span}>
                    <TextField 
                        type="number" 
                        label="Preço R$" 
                        variant="outlined" 
                        fullWidth={true}
                        onChange={(e) => setPrice(e.target.value)}
                        value={price || 0}
                        onFocus={(e) => e.target.select()}
                        required
                    />
                </span>
                <span className={styles.add_span}>
                    <TextField 
                        type="number" 
                        label="Quantidade em estoque KG" 
                        variant="outlined" 
                        fullWidth={true}
                        onChange={(e) => setStock(e.target.value)}
                        value={qtyStock || 0}
                        onFocus={(e) => e.target.select()}
                        required
                    />
                </span>   

                <span className={styles.add_img_span}>
                    <img src={ previewImage ? URL.createObjectURL(previewImage) : noImage } alt="Imagem do produto" />    
                </span>

                <span className={styles.add_span}>
                <input
                    accept="image/png, image/jpg, image/jpeg"
                    className='uploadImage'
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFile}
                    />
                    <label htmlFor="raised-button-file">
                    <Button 
                        variant="raised" 
                        component="span" 
                        className='uploadImage'
                        color="primary"
                        size="large"
                        fullWidth={true}
                        >                            
                        Selecionar imagem
                    </Button>
                    </label> 
                        
                </span>              
                
                <span className={styles.add_span}>                
                    <LoadingButton
                        type='submit'
                        color="primary"
                        loading={loading}
                        variant="contained"
                        size="large"
                        fullWidth={true}
                        >
                        Cadastrar
                    </LoadingButton>   
                </span>                
            </form>  
            {error && <Alert severity="error">{error}</Alert>}                 
        </div>
        <div className={styles.add_footer}>
        <p>Finalizou ? <span><Link to='/products'>Ver todos produtos</Link></span></p> 
        </div>      
    </div>
  )
}
