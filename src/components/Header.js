import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const Header = () => {
    const activeStyle = {
        fontWeight: "bold"
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid"> 
            <a href="/" className="navbar-brand">Test</a>
            <Button className="navbar-toggler" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportContent" 
                aria-conttrols="navbarSupportContent" 
                aria-expanded="false"
                aria-label="Toggle Navigation">
                      <span className="navbar-toggler-icon"></span>
                </Button>
                <div className="collapse navbar-collapse" id="navbarSupportedContents">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" 
                            style={({ isActive }) => isActive ? 
                            activeStyle : undefined}>
                                Home
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile" 
                            style={({ isActive }) => isActive ? 
                            activeStyle : undefined}>
                                Profile
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blog" 
                            style={({ isActive }) => isActive ? 
                            activeStyle : undefined}>
                                Blog
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;