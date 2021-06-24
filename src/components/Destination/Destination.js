import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Destination.css';
import mapImage from '../../image/map.png';
const Destination = () => {
    const{vehiclesType} = useParams();
    const [location, setLocation] = useState({
        locationForm: '',
        locationTo: ''
    });
    const handleSubmit = (e) => {
        
        e.preventDefault();
    }
    return (
        <div className='destinationContainer'>
           <Container>
            <Row>
                <Col md={4}>
                    <form onSubmit={handleSubmit}>
                        <h6>Pick Form</h6>
                        <input type="text" onBlur='' name="" id="" /> <br /><br />
                        <h6>Pick To</h6>
                        <input type="text" onBlur='' name="" id="" />
                        <br /><br />
                        <input className="search-btn" type="submit" value="Search" />
                    </form>
                </Col>
                <Col md={8}>
                    <img src={mapImage} alt="" />
                </Col>
            </Row>
           </Container>
        </div>
    );
};

export default Destination;