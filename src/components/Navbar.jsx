import React from 'react'
import { Link, useParams } from 'react-router-dom';


// show categories navbar
function Navbar() {
  const {name} = useParams()

  return (
    <div className="container">
    <nav className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
        <li className="nav-item"><Link to={`/categories/Books`} href="#" className={`nav-link ${name==="Books" && "active"}`} aria-current="page">Books</Link></li>
        <li className="nav-item"><Link to={`/categories/Clothing`} href="#" className={`nav-link  ${name==="Clothing" && "active"}`}>Clothing</Link></li>
        <li className="nav-item"><Link to={`/categories/Electronic Device`} href="#" className={`nav-link ${name==="Electronic Device" && "active"}`}>Electronic Device</Link></li>
        <li className="nav-item"><Link to={`/categories/Home Garden`} href="#" className={`nav-link ${name==="Home Garden" && "active"}`}>Home Garden</Link></li>
        <li className="nav-item"><Link to={`/categories/Sports`} href="#" className={`nav-link ${name==="Sports" && "active"}`}>Sports</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar
