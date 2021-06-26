import React, { useContext } from 'react';
import { Nav, Navbar, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContextUser } from '../../App';
import './Header.css';

const Header = () => {
    const[loggedInUser, setLoggedInUser] = useContext(ContextUser);
    return (
        <div className="header-container">
            <Navbar bg="primary" variant="dark">
                <h3 href="/home" className="site-name">Urban Rider</h3>
                <Nav className="mx-auto">
                   <div className=" nav-item ">
                    <Link to="home">Home</Link>
                    <Link to="destination">Destination</Link>
                    <Link to="blog">Blog</Link>
                    <Link to="contact">Contact</Link>
                    {
                      <img src={loggedInUser.image} alt="" />
                    }
                        {loggedInUser.success && <span>{loggedInUser.name}</span>}
                    {
                        !loggedInUser.isSignedIn ? <Link to="login">Login</Link>
                        :<Button onClick={()=> setLoggedInUser({})}>Log Out</Button>
                    }
                   </div>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;