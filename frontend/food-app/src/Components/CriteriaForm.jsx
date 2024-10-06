import { set, useForm } from "react-hook-form";
import {useState, useEffect} from "react";

import styles from "../stylesheets/criteriaForm.module.css"

export default function CriteriaForm(){
  const [file, setFile] = useState(null);
  

  

    const {
        register,
        handleSubmit,
        formState: { errors }, setValue
      } = useForm();

      const onSubmit = (data) => {
            
        console.log(data); //form submission to server stuff goes here
         




        setValue("fname", '');
        setValue("lname", '');
        setValue("email", '');
        setValue("file", undefined);
        document.querySelector('input[type="file"]').value = '';
       
      };
      const handleFileChange = (e) =>{
          setFile(e.target.files[0]);
      };
    
    
    

      return(
        <div className={styles.formDiv}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.main}> 
                <div className={styles.inner} >
                  
                <label htmlFor="fname">First Name
                    <input id="firstname" {...register("fname", { required: true })} placeholder="Enter First Name" /></label>
                </div>
                <div className={styles.inner}>
                <label htmlFor="lname">Last Name
                    <input id="lastname" {...register("lname", { required: true })} placeholder="Enter Last Name" /></label>
                </div>
                <div className={styles.inner}>
          <label htmlFor="email">Email
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter Email"
          />
          </label>{errors.email && (
            <p className="error">Please enter a valid email address</p>
          )}
        </div>
            <div className={styles.inner}>
              <label htmlFor="gtypelose">Lose Weight
              <input id="goaltypelose" type="radio"  {...register("gtype", { required: true })}/>
              </label>
            </div>
            <div className={styles.inner}>
            <label htmlFor="gtypemaintain">Maintain Weight
              <input id="goaltypemaintain" type="radio"  {...register("gtype", { required: true })}/>
              
              </label>
            </div>
            <div className={styles.inner}>
            <label htmlFor="gtypegain">Gain Weight
              <input id="goaltypegain" type="radio"  {...register("gtype", { required: true })}/>
              </label>
            </div>
            <div className={styles.inner}>
              <input id="image" type="file"  onChange={handleFileChange}/>   
            </div>
            <button type="submit"> Submit</button>
            </form>


        </div>


      );

}