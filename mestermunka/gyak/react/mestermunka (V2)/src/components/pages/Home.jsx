import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Home.css'

export const Home =() => {
    const showELement = true;
    const [data,setData] = useState([])
    const [input,setInput] = useState("");
    function submint(e){
        e.showELement = false
    }


    useEffect(() => {
        axios.get('http://localhost:3001/osszes')
        .then(data => setData(data.data))
        .catch(err => console.log(err));
        
    }, [])

  return (
    <>

    <div className="row">
        <div className="col-sm-3">
            <input type="text" id="ingredients" placeholder="Írja be a recept nevét..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <input type="text" id="ingredients" placeholder="Írja be a hozzávalót..."/>
        </div>
        <div className="col-sm-6">
            <table>
                <tbody>
                {data.map((d) =>
                    <tr id='Box' key={data.Receptek_id} style={{fontSize:"15px"}}>
                        <img src={d.kep} id='img' style={{maxWidth:"300px", height:"auto" }}/>
                        <th id='name'>{d.Receptek_neve}</th>
                        { showELement && <td id='recept'>{d.Keszites}</td>}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        <div className="col-sm-3">
            <h1 style={{textAlign:"center"}}>Rólunk</h1>
        </div>
    </div>
     
      

    </>
  )
}
