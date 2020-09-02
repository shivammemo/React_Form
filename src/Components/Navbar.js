import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className="container navbar-container">
            <nav className="nav nav-pills nav-justified">
                <NavLink exact activeClassName="nav-pills nav-link active" className="nav-item nav-link " to='/'>Create User</NavLink>
                <NavLink exact activeClassName="nav-pills nav-link active" className="nav-item nav-link " to='/view'>View Users</NavLink>
            </nav>
        </div>
    )
}

export default Navbar
