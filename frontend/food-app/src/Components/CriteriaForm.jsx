import { useForm } from "react-hook-form";
import {useState, useEffect} from "react";
import React from "react";

import getCredentials from "./constants";
import styles from "../stylesheets/criteriaForm.module.css"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useNavigate } from "react-router-dom";

let info = getCredentials();

const s3Client = new S3Client({
  region: "ca-central-1",
  credentials: {
      accessKeyId: info["key"],
      secretAccessKey: info["secret"],
  },
});

export default function CriteriaForm(){
  
  const navigate = useNavigate();  
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [gtype, setgtype] = useState('');

    
    const {
        register,
        handleSubmit,
        formState: { errors }, setValue
      } = useForm();

      const uploadToS3 = async (file) => {
        try {
          // Set the S3 parameters
          const params = {
            Bucket: "fridge-food-images", // S3 Bucket name
            Key: file.name, // File name
            Body: file, // File object (image)
            ContentType: file.type, // MIME type of the file
            ACL: 'public-read'
          };
    
          // Upload the image to S3
          const data = await s3Client.send(new PutObjectCommand(params));
          console.log("Upload Success", data);
        } catch (error) {
          console.log("Upload Error", error);
        }
      };

      const onSubmit =  async(data) => {
       
        console.log("form data", data);

        if (data.image && data.image[0]) {
          console.log("image file: ", data.image[0]);
          uploadToS3(data.image[0]);
          
          data["image"] = data.image[0].name;
          const queryString = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');

        // Navigate to the new URL with the query string
        navigate(`/search/${queryString}`);
          
           }else{
              console.log("no img selected");
            }
 
    };
    
      const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if (file){
          //setFile(e.target.files[0]);
          setValue("image", e.target.files);
        
        }
          
      };
      const handleChange = (e)=>{
        setgtype(e.target.value);

      }
    
    
    

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
              <input id="goaltypelose" type="radio" value="lose"  
          onChange={handleChange} {...register("gtype", { required: true })}/>
              </label>
            </div>
            <div className={styles.inner}>
            <label htmlFor="gtypemaintain">Maintain Weight
              <input id="goaltypemaintain" type="radio" value="maintain" 
          onChange={handleChange}{...register("gtype", { required: true })}/>
              
              </label>
            </div>
            <div className={styles.inner}>
            <label htmlFor="gtypegain">Gain Weight
              <input id="goaltypegain" type="radio"  value="gain" 
          onChange={handleChange}{...register("gtype", { required: true })}/>
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