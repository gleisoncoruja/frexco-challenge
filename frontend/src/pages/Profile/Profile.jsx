// components
import { Button, TextField,Alert  } from '@mui/material'

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'


export const Profile = () => {    
    // states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { user, message, error, loading } = useSelector((state) => state.user)

    

    // load user data
    useEffect(() => {
        dispatch(profile())
    },[dispatch])

    // Fill form with user data
    useEffect(() => {
        if (user){
            setName(user.name)
            setEmail(user.email)            
        }
    },[user])
    
    
   
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const userData = {
            name,
        }

        if (password){
            userData.password = password;
        }

        await dispatch(updateProfile(userData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 4000)
        
    }

    
  

  return (
    <div className='auth'>
        <div className="auth_header">
            <h1>Bem vindo! <span>{user && user.name}</span></h1>       
            <p>Edite seu cadastro</p>  
        </div>      
        
        <div className="auth_container">
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
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
                disabled
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
                
                />
                </span>
                <span>                
                {password !== confirmPassword ? (
                    <Alert severity="error">As senhas não são iguais</Alert>
                ) : (
                    loading ? (
                        <Button type='submit' variant="contained" fullWidth={true} size="large" disabled>Aguarde...</Button>
                    ) :(
                        <Button type='submit' variant="contained" fullWidth={true} size="large">Salvar</Button>
                    )
                    
                ) }
                </span>                
            </form>        
        </div>    
    </div>
  )
}
