import React from "react";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "tachyons"




const App = (props) => {
    const [termek, setTermekek] = useState([]);
    useEffect(() => {
        fetch(`https://fakestoreapiserver.reactbd.com/products`)
            .then(res => res.json())
            .then(data => setTermekek(data))
    }, []);
    return (
        <div className="container-fluid bg-light-gray"> 
            <article className="row justify-content-center">
                <h1 className="text-center display-4 mt-5 mb-5 bg-light-blue">Kollekciok</h1>
                <div className="row">
                        {termek.map(termekek => (

                            <div className="col-md-4">
                                <div className="bg-light-blue br3 pa3 ma2 grow bw2 shadow-5" key={termekek.id}>
                                    <h2 className="text-center">{termekek.title}</h2>
                                    <p>Neve: {termekek.title}</p>
                                    <p>Régi ár: ${termekek.oldPrice}</p>
                                    <p>Mostani ár: ${termekek.price}</p>
                                    <p>Leirás: {termekek.description}</p>
                                    <p>Kategoria: {termekek.category}</p>
                                    <p>Értékelés: {termekek.rating}</p>
                                    <img src={termekek.image}></img>
                                </div>
                            </div>
                            
                        ))}
                </div>
            </article>
        </div>
    );
}

export default App;