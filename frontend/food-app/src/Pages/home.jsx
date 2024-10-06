
import styles from "../stylesheets/home.module.css"
import CriteriaForm from "../Components/CriteriaForm";


export default function Home(){

    return(
        <>
        
            <div className={styles.page}>
                <div className={styles.title}>
                    <div className={styles.textcard} >
                    <h1>Welcome To HappyTummies! </h1>
                    <h2>Here You Will Fill Your Belly Meals Made From Sustainable Foods!</h2>
                    </div>
                </div>

                <div className={styles.textcard}>
                    <h1>Get Started Below!</h1>
                </div>
                <CriteriaForm/>
            </div>
    
        </>
    );
}