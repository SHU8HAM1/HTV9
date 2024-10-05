import { Link } from "react-router-dom";
import styles from "../stylesheets/navBar.module.css";
export default function NavBar(){
    
    return (
        <div className={styles.div1}> 
        <h2 className= {styles.title}>HappyTummies</h2>
      
        <div className={styles.div2}>
    <Link to="/">
    <p className= {styles.navButton}>Home</p>
    </Link>
    
   
        </div>

    </div>);

}