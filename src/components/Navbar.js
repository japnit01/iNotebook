import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload(false);


    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" :""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" :""}`} to="/about">Link</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <div className='d-flex' style={{color:"white"}}>
                            <Link className='nav-item me-2' role="button" to="/login">Login</Link>
                            <Link className='nav-item' to="/signup">Sign Up</Link>    
                        </div>:<button className="btn btn-primary" onClick={handlelogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
