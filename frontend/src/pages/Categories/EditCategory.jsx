// Import and use styles from another way
import styles from './EditCategory.module.css'

// components
import {  TextField,Alert  } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom'


// hooks
import { useParams } from "react-router-dom"
import { useState, useEffect, useMemo } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryById, updateCategory, reset } from '../../slices/categorySlice'


export const EditCategory = () => {
    const  { id } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const { category, message, error, loading} = useSelector((state) => state.categories)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newData = {}
        
        const categoryData = {
            name,
            description,
            }
        newData.data = categoryData
        newData.id = id
        dispatch(updateCategory(newData))  
    }

    // Get category by id
    useEffect(() => {
        dispatch(getCategoryById(id))
    },[dispatch,id])


    // Update states
    useMemo(() => {
        setName(category.name)
        setDescription(category.description)
    },[category])

    
    // Clean update states
    useEffect(() => {
        if(message){
            setTimeout(() => {
                dispatch(reset())
            }, 4000)  
        } else{
            dispatch(reset())
        }       
    },[dispatch, message] )


  return (
    <div className={styles.add}>
        <div className={styles.add_header}>
            <h1>Editar categoria</h1>       
            <p>Edite uma categoria</p>  
        </div>      
        
        <div className={styles.add_container}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <form className={styles.add_form} onSubmit={handleSubmit}>
                <span className={styles.add_span}>
                <TextField 
                type="text" 
                label="Nome" 
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
                
                <LoadingButton
                    type='submit'
                    color="primary"
                    loading={loading}
                    variant="contained"
                    size="large"
                    fullWidth={true}
                    >
                    Atualizar
                </LoadingButton>   
                </span>                
            </form>        
        </div>
        <div className={styles.add_footer}>
        <p>Finalizou ? <span><Link to='/categories'>Ver todas categorias</Link></span></p> 
        </div>      
    </div>
  )
}
