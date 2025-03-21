import React ,{ useState,useEffect } from 'react'
import './Home.css'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import Table from "react-bootstrap/Table"

export const Home = () => {
  const [data,setData] = useState([])
  useEffect(() =>{
    axios.get('http://localhost:3001/szobak')
    .then(data => setData(data.data))
    .catch(err => console.log(err));
  }, [])
  return (
    <>
      <div className='row'>
        <div className='col-sm-4'>
        <h1>Napraforgós Nemzeti Tanússitó Véddjegí célja</h1>
        </div>
        <div className='col-sm-4'>
        <h1>Falusi szálláshelyi fajtái</h1>
        </div>
        <div className='col-sm-4'>
        <h1>A hét törpe fogadó</h1>
        <Table striped bordered hover>
          {data.map((d) =>
          <tbody>
            <tr key={d.szazon}>
              <td>{d.sznev}</td>
              <td>{d.agy}</td>
            </tr>
          </tbody>
          )}
        </Table>
        </div>

      </div>

    </>
  )
}
