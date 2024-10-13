
import styles from "../stylesheets/result.module.css"
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
      return <div className={styles.result} >Loading...</div>;
    }
    return(
        <>
        
            <div >
                <div className={styles.parent}>
                        <div className={styles.top}></div>
                            <div className={styles.result}>

                                {results[0]}
                            
                            </div>
                            <h2>Ingredients
                                </h2>
                                <div className={styles.result}>{results[1]}</div>
                                <h2>Instructions</h2>
                                <div className={styles.result}>{results[2]}</div>
                                <div className={styles.bottom}></div>
                    
                </div>

                
                
            </div>
    
        </>
    );
}