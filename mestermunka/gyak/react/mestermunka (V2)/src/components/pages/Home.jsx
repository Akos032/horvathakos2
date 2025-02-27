import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Home.css'

export const Home =() => {
    const showELement = true;
    const [data,setData] = useState([])
    const [input,setInput] = useState("");


    useEffect(() => {
        axios.get('http://localhost:3001/osszes')
        .then(data => setData(data.data))
        .catch(err => console.log(err));
        
    }, [])

  return (
    <>

    <div className="row">
        <div className="col-sm-4">
            <input type="text" id="ingredients" placeholder="Írja be a recept nevét..." />
            <input type="text" id="ingredients" placeholder="Írja be a hozzávalót..."/>
        </div>
        <div className="col-sm-4">
                {data.map((d) =>
                   <div className="card mb-3" style={{maxWidth: "800px",height:"auto"}}>
                        <div className="row g-0" key={d.Receptek_id}>
                            <div className="col-md-4">
                                <img src={d.kep} className="img-fluid rounded-start" style={{ margin:"5px"}}/>
                            </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{d.Receptek_neve}</h5>
                                <p className="card-text">{d.Keszites.substring(0,200)}</p>
                                <button type="button">Több</button>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
        </div>
        <div className="col-sm-4">
            <h1 style={{textAlign:"center", margin:"5px"}}>Rólunk</h1>
        </div>
    </div>
     
      

    </>
  )
}
