import './Auth.css'

// components
import { Alert, Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'


// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux 
import { login, reset } from '../../slices/authSlice'


export const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()

  const { error, loading } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  },[dispatch])

  return (
    <div className='auth'>
        <div className="auth_header">
            <h1>Login</h1>       
            <p>Faça login para ter acesso a todas funcionalidades</p>  
        </div>      
        
        <div className="auth_container">
            {error && <Alert severity="error">{error}</Alert>}
            <form className='auth_form' onSubmit={handleSubmit}>
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
                {!loading ? (
                  <Button type='submit' variant="contained" fullWidth={true} size="large">Entrar</Button>
                ):(
                  <Button type='submit' variant="contained" fullWidth={true} size="large" disabled>Aguarde...</Button>
                )}
                </span>                
            </form>        
        </div>
        <div className="auth_footer">
        <p>Não tem conta ainda? <span><Link to='/register'>Fazer cadastro</Link></span></p> 
        </div>      
    </div>
  )
}
