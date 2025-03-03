import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Profile.css'
 
export const Profile =() => {
   
    useEffect(() => {
        axios.get('http://localhost:3001/profil')
        .then(data => setData(data.data))
        .catch(err => console.log(err));
       
    }, [])
 
 
    return (
       <div className="row">
 
       </div>
     
 
       
    );
 
   
 
};