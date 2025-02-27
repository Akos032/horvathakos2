import React, {useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

export const Login = () =>{

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
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user">Felhasználó név</label>
                        <input type="user" placeholder="Ird be a felhasználó neved"  className="form-control" onChange={e =>setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emial">Email</label>
                        <input type="email" placeholder="Ird be az emailod"  className="form-control" onChange={e =>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jelszo">Jelszó</label>
                        <input type="jelszo" placeholder="Ird be a jelszod" className="form-control"  onChange={e =>setPasswrod(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Bejelentkezés</button>
                </form>
            </div>
        </div>
        </>
    )
}
