import React, {useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import './LoginRegister.css';
import { FaUser, FaLock  } from "react-icons/fa";  
import { MdOutlineAlternateEmail } from "react-icons/md"; 



export const LoginRegister = () =>{

    const[username,setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPasswrod] = useState('')
    
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3001/login', {username,email,password})
        .then(res => console.log(res))
        .catch(err => console.log(err));

    }

    return(
        <>
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                <h1>Bejelentkezés</h1>
                <div className="input-box">
                    <input type="user" placeholder="Felhasználónév" required className="form-control" onChange={e =>setUsername(e.target.value)}/>
                    <FaUser className="Ikon" />
                </div>
                <div className="input-box">
                    <input type="email" placeholder="E-mail cím" required  className="form-control" onChange={e =>setEmail(e.target.value)}/>
                    <MdOutlineAlternateEmail className="Ikon" />
                </div>
                <div className="input-box">
                    <input type="jelszo" placeholder="Jelszó" required className="form-control" onChange={e =>setPasswrod(e.target.value)}/>
                    <FaLock className="Ikon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Emlékezz rám</label>
                    <a href="#">Elfelejtetted a jelszavadat?</a>
                </div>

                <button type="submit">Bejelentkezés</button>
                <div className="register-link">
                    <p>Nincsen fiókod? <a href="#">Regisztráció</a></p>
                </div>
                
                </form>
                
            </div>
        </div>
        </>
    )
}
