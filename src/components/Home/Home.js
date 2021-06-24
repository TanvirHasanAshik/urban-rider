import { Button } from 'bootstrap';
import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bgImg from "../../image/Bg.png";
import "./Home.css";
import vehicle from '../../fakeData/vehicles';
import VehicleCollection from '../VehicleCollection/VehicleCollection';
const Home = () => {
    console.log(vehicle);
    return (
        <div className="home-component">
           <Container className="home-container">
                <Row>
                    {
                        vehicle.map( ride => <Col md={3}> 
                        <VehicleCollection ride={ride}></VehicleCollection>
                        </Col>)
                    }
                </Row>
           </Container>
        </div>
    );
};

export default Home;