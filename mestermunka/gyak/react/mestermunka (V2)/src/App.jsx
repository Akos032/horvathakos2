import './App.css'
import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axois from "axios"

function App() {

  const [data,setData] = useState([])

    useEffect(() => {
        axois.get('http://localhost:3000/osszes')
        .then(data => setData(data.data))
        .catch(err => console.log(err));
        
    }, [])  
  return (
    <>

      <table>
        <tbody>
          {data.map((d) =>
              <tr key={data.Receptek_id}>
                <img src={d.kep}/>
                <th>{d.Receptek_neve}</th>
                <td>{d.Keszites}</td>
            </tr>
          )}
        </tbody>
      </table>
      

    </>
  )
}

export default App
