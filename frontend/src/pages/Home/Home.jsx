import { Link } from 'react-router-dom'
import styles from './Home.module.css'


export const Home = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
         <h1>Bem vindo ao Desafio</h1>
         <h2>Desafio Full Stack Developer | Processo Seletivo Estágio Frexco</h2>        
      </div> 
      
      <div className={styles.middleDiv}>
        <h2>Apresentação</h2>
        <p>
          Olá, é com muito orgulho que apresento o projeto que desenvolvi para o desafio promovido pela empresa Frexco, esse projeto apesar de ser simples envolve várias funcionalidades 
          por trás de sua simplicidade, tais como validação de autenticação por JWT, validações das requisições tanto no back-end quanto no front-end, restrições de acesso para usuários não autenticados.
        </p>  
        <h2>O que podemos encontrar nesse projeto?</h2>    
        <ul>
          <li>Cadastro e edição de usuário</li>
          <li>Login/logout</li>
          <li>CRUD completo de produtos com foto</li>
          <li>Controle de estoque</li>
          <li>Histórico de compras</li>
          <li>CRUD completo de categorias</li>
          <li>Simulação de compras</li>
        </ul>
        <h2>Quais técnologias foram utilizadas?</h2>
        <h3>Back-end</h3>
        <ul>
          <li>Node</li>
          <li>Bcryptjs</li>
          <li>Express / express-validator</li>
          <li>JWT</li>
          <li>Mongoose</li>
          <li>Multer</li>
          <li>Banco de dados MongoDB Atlas</li>
        </ul>
        <h3>Front-end</h3>
        <ul>
          <li>ReactJS</li>
          <li>React router dom</li>
          <li>Redux e redux/toolkit</li>
          <li>Mui material</li>
        </ul>
      </div>
      <div className={styles.home_footer}>
      <p>Vamos testar ? <span><Link to='/register'>Criar uma conta</Link></span></p> 
      </div>
    </div>
  )
}
