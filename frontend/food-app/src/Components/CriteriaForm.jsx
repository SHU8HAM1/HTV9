import { useForm } from "react-hook-form";
import {useState, useEffect} from "react";


import styles from "../stylesheets/criteriaForm.module.css"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


const s3Client = new S3Client({
  region: "ca-central-1",
  credentials: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export default function CriteriaForm(){
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gtype, setgtype] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }, setValue
      } = useForm();

      const onSubmit = async (data) => {
      

        const fileInput = document.getElementById('image');

        setValue("fname", '');
        setValue("lname", '');
        setValue("email", '');
        setValue("file", undefined);
        document.querySelector('input[type="file"]').value = '';
        if (fileInput.files[0]) {
          const file = fileInput.files[0];

          const params = {
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Key: `${Date.now()}_${file.name}`, // Unique file name
              Body: file,
              ACL: 'public-read', // Change as needed
          };

          try {
              const command = new PutObjectCommand(params);
              const response = await s3Client.send(command);
              console.log('File uploaded successfully:', response);
              // Here you can also send the form data to your backend if needed
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      }
      
       
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