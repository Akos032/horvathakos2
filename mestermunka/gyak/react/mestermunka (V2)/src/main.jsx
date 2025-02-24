import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Nav from './nav.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App/>
  </StrictMode>

)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <BrowserRouter>
      <Nav/>
    </BrowserRouter>
  </StrictMode>
)
