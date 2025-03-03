import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Home.css'

export const Home =() => {
    const [kereses, setKereses] = useState("");
    const [osszes, setOsszes] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const paragraph = 
        {
            WebkitLineClamp:4, 
            WebkitBoxOrient: "vertical", 
            overflow:'hidden',
            display:'-webkit-box'
        }


    useEffect(() => {
        axios.get(`http://localhost:3001/api/osszes?keres=${kereses}`)
        .then(data => setOsszes(data.data))
        .catch(err => console.log(err));
        
    }, [kereses])

  return (
    <>

    <div className="row">
        <div className="col-sm-4">
        <input type="text" placeholder="Keresés..." value={kereses} onChange={(e) => setKereses(e.target.value)}/>
        </div>
        <div className="col-sm-4">
                {osszes.map((ossze) =>
                   <div className="card mb-3" style={{maxWidth: "800px",height:"auto"}}>
                        <div className="row g-0" key={ossze.Receptek_id}>
                            <div className="col-md-4">
                                <img src={ossze.kep} className="img-fluid rounded-start" style={{ margin:"5px"}}/>
                            </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{ossze.Receptek_neve}</h5>
                                <p style={ isOpen ? null : paragraph} className="card-text">
                                        {ossze.Keszites}
                                </p>
                                <button type="button" onClick={() => setIsOpen(!isOpen)}>{isOpen ?'Kevesebb' : 'Több'}</button>
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
