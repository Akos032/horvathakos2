import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Home.css'

export const Home =() => {
    const [kereses, setKereses] = useState("");
    const [osszes, setOsszes] = useState([]);
    const [TobbId, setTobbId] = useState(null);

    const handle = (id) => {
        setTobbId(TobbId === id ? null : id);
    };

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
                                <p className="card-text">
                                    {TobbId === ossze.Receptek_id ? ossze.Keszites : `${ossze.Keszites.substring(0,200)}...`}
                                </p>
                                <button onClick={() => handle(ossze.Receptek_id)} className="text-blue-600 hover:underline"> {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}</button>
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
