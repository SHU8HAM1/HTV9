
import styles from "../stylesheets/home.module.css"
import CriteriaForm from "../Components/CriteriaForm";
import { useParams,useLocation } from "react-router-dom";
import {useState, useEffect} from "react"
import axios from "axios"

export default function Result(){

    const { query } = useParams();
    const [results, setresults] = useState(null);
    const [loading, setloading] = useState(true);
    console.log(query);
    useEffect(() => {
    const handleSearch = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/upload/', {
            params: { q: query }
          });
          setresults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally{
          setloading(false);
        }
    };

    handleSearch();

    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }
    return(
        <>
        
            <div className={styles.page}>
                <div className={styles.title}>
                    <div className={styles.textcard} >
                    <h1>Welcome To HappyTummies! </h1>
                    <h2>Here You Will Fill Your Belly Meals Made From Sustainable Foods!</h2>
                    </div>
                </div>

                
                
            </div>
    
        </>
    );
}