import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return (
        <div className="header-container">
            <Navbar bg="primary" variant="dark">
                <h3 href="/home" className="site-name">Urban Rider</h3>
                <Nav className="mx-auto">
                   <div className="  nav-item ">
                    <Link to="home">Home</Link>
                    <Link to="destination">Destination</Link>
                    <Link to="blog">Blog</Link>
                    <Link to="contact">Contact</Link>
                    <Link to="login">Login</Link>
                   </div>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;