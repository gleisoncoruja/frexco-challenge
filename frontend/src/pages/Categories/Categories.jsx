import './Categories.css'

// Components
import { Alert, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import { getCategories,deleteCategory, reset } from '../../slices/categorySlice'




export const Categories = () => {

  const [listCategories, setListCategories] = useState({})
  const [categoryId, setCategoryId] = useState('')
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const { categories,loading,message } = useSelector((state) => state.categories)

  // load categories data
  useEffect(() => {    
    dispatch(getCategories())
    dispatch(reset())
  },[dispatch])

  useMemo(() => {
    if(categories.length > 0){
      setListCategories(categories)
    }
    
  },[categories])
  

  // Function to open confirm dialog
  const handleClickOpen = (id) => {
    setCategoryId(id)
    setOpen(true);

    
  };

   // Function to open confirm dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Delete a category by idd
  const handleDelete = async() => {
    await dispatch(deleteCategory(categoryId))
    setOpen(false)

    // update the category list so you don't have to make a new request
    setListCategories(listCategories.filter((category) => category._id !== categoryId))

    setTimeout(() => {
      dispatch(reset())
  }, 4000)
  }


  if (loading) {
    return <LoadBackDrop show={true} />;
  }


  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>Gerenciar Categorias</h1>
        <p>Aqui você poderá visualizar, inserir, editar ou excluir uma categoria</p>
      </div>
      
      <div className='middleDiv'>
      {message && <Alert severity="success">{message}</Alert>}
        <div className="gridDiv">
          <table id='tableCategories'>            
              <thead>
              <tr className='tableTitle'>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
              </thead>
              
            <tbody>
            {listCategories.length > 0 && listCategories.map((category) => (             
                <tr key={category._id} >
                  <td >{category._id}</td>
                  <td >{category.name}</td>
                  <td >{category.description}</td>
                  <td className='tdActions'>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=> handleClickOpen(category._id)}>
                      Excluir
                    </Button>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`${category._id}`)}>
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
