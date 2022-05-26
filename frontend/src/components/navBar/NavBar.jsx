import './NavBar.css'

// Components 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


// Hooks
import { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// Redux
import { logout, reset } from '../../slices/authSlice'

const pages = ['Home','Produtos', 'Categorias','Simular compra'];
const pages_link =['/','/products','/categories','/buy']


export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { auth } = useAuth();

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

    return (
        <div className="nav_bar">
            <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap               
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <Link to='/'>Frexco</Link> 
                </Typography>                    
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page,index) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center"><Link to={pages_link[index]}>{page}</Link> </Typography>                        
                        </MenuItem>
                    ))}
                    {!auth && (
                        <div>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Button color="inherit"><Link to='/login'>Entrar</Link></Button>
                            </Typography>                        
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Button color="inherit"><Link to='/register'>Cadastrar</Link></Button>
                            </Typography>                        
                        </MenuItem>                            
                        </div>                       
                        )}
                                       
                    </Menu>
                    
                </Box>                
                <Typography
                    variant="h5"
                    noWrap
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                   <Link to='/'>Frexco</Link> 
                </Typography>


                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page,index) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        <Link to={pages_link[index]}>{page}</Link>
                    </Button>
                    ))}   
                </Box>

                {!auth && (
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit"><Link to='/login'>Entrar</Link></Button>
                        <Button color="inherit"><Link to='/register'>Cadastrar</Link></Button>
                    </Box>
                )}
                

                
                {auth && (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Menu do usuário">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/frexco.png" />
                        </IconButton>
                        </Tooltip>                    
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >                     
                        
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Link to='/profile'>Perfíl</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <span onClick={handleLogout}>Sair</span>
                            </Typography>
                        </MenuItem>
                        
                        </Menu>
                    </Box>

                )}
                
                </Toolbar>
            </Container>
            </AppBar>
        </div>
      );
}
