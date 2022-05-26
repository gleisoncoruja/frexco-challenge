// Import and use styles from another way
import styles from './AddNewCategory.module.css'

// components
import {  TextField,Alert  } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom'

// hooks
import { useState, useRef, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { addCategory, reset } from '../../slices/categorySlice'

export const AddNewCategory = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const inputRef = useRef()

    const { message, error, loading} = useSelector((state) => state.categories)

    const dispatch = useDispatch()


    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const categoryData = {
            name,
            description,
        }

        dispatch(addCategory(categoryData))             
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

    

  return (
    <div className={styles.add}>
        <div className={styles.add_header}>
            <h1>Nova categoria</h1>       
            <p>Cadastre uma nova categoria</p>  
        </div>      
        
        <div className={styles.add_container}>
            {error && <Alert severity="error">{error}</Alert>}
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
        </div>
        <div className={styles.add_footer}>
        <p>Finalizou ? <span><Link to='/categories'>Ver todas categorias</Link></span></p> 
        </div>      
    </div>
  )
}
