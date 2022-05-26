import styles from './Footer.module.css'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <footer>
        <div className={styles.div_footer}>
            <p>Gleison Souza &copy; 2022 </p> 
            <hr />
            <span>
                <a href="https://www.linkedin.com/in/gleison-souza-3b0939237/" target="_blank" rel="noreferrer" > 
                    <LinkedInIcon />
                </a> 
                
                <a href="https://github.com/gleisoncoruja/" target="_blank" rel="noreferrer" > 
                <GitHubIcon />
                </a>
            </span>
        </div>        
    </footer>
  )
}
