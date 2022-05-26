import './Auth.css'

// components
import { Button, TextField,Alert  } from '@mui/material'
import { Link } from 'react-router-dom'

// hooks
import { useState, useEffect } from 'react'

// Redux
import { register, reset } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.auth)
   
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        dispatch(register(user))
    }

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    },[dispatch])
    
  return (
    <div className='auth'>
        <div className="auth_header">
            <h1>Cadastro</h1>       
            <p>Faça seu cadastro para ter acesso a todas funcionalidades</p>  
        </div>      
        
        <div className="auth_container">
            {error && <Alert severity="error">{error}</Alert>}
            <form className='auth_form' onSubmit={handleSubmit}>
                <span>
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
                <span>
                <TextField 
                type="email" 
                label="E-mail" 
                variant="outlined" 
                fullWidth={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email || ''}
                required
                />
                </span>               
                <span>
                <TextField 
                type="password" 
                label="Senha" 
                variant="outlined" 
                fullWidth={true}
                onChange={(e) => setPassword(e.target.value)}
                value={password || ''}
                required
                />
                </span>
                <span>
                <TextField 
                type="password" 
                label="Repita a senha" 
                variant="outlined" 
                fullWidth={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword || ''}
                required
                />
                </span>
                <span>                
                {password !== confirmPassword ? (
                    <Alert severity="error">As senhas não são iguais</Alert>
                ) : (
                    loading ? (
                        <Button type='submit' variant="contained" fullWidth={true} size="large" disabled>Aguarde...</Button>
                    ) :(
                        <Button type='submit' variant="contained" fullWidth={true} size="large">Cadastrar</Button>
                    )
                    
                ) }
                </span>                
            </form>        
        </div>
        <div className="auth_footer">
        <p>Já tem uma conta? <span><Link to='/login'>Fazer login</Link></span></p> 
        </div>      
    </div>
  )
}
