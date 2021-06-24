import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Destination.css';
import mapImage from '../../image/map.png';
import orderRide from '../../fakeData/vehiclesCapacity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {
    const{vehiclesType} = useParams();
    const [order, setOrder] = useState({});
    const [location, setLocation] = useState({
        locationForm: '',
        locationTo: '', 
        isSubmitted: false
    });
    const handleSubmit = (e) => {
        if(location.locationForm && location.locationTo){
            const submitLocation = {...location};
            submitLocation.isSubmitted = true;
            setLocation(submitLocation);
        }
        e.preventDefault();
    }

    const handleBlur = (e) => {
        if(e.target.name === 'pickForm'){
            const pickForm = {...location};
            pickForm.locationForm = e.target.value;
            setLocation(pickForm);
        }
        if(e.target.name === 'pickTo'){
            const pickTo = {...location};
            pickTo.locationTo = e.target.value;
            setLocation(pickTo);
        }
    }
    useEffect(()=>{
        const ride = orderRide.find((r) => {
            if(vehiclesType === r.vehicle){
                return r;
            }
        });
        setOrder(ride);
    }, [vehiclesType])
    
    console.log(order);
    return (
        <div className='destinationContainer'>
           <Container>
            <Row>
                <Col md={4}>
                    {
                        !location.isSubmitted ? 
                        <form onSubmit={handleSubmit}>
                            <h6>Pick Form</h6>
                            <input type="text" onBlur={handleBlur} name="pickForm" id="" required/> <br /><br />
                            <h6>Pick To</h6>
                            <input type="text" onBlur={handleBlur} name="pickTo" id="" required/>
                            <br /><br />
                            <input className="search-btn" type="submit" value="Search" />
                        </form>
                        :
                        <div className="destination">
                            <Container >
                                <Row className="location">
                                    <Col  md={8}>
                                        <h4>{location.locationForm}</h4>
                                        <h6>To</h6>
                                        <h4>{location.locationTo}</h4>
                                    </Col>
                                    <Col md={4}>
                                        <img src={order.vehicleImg} alt="" />
                                    </Col>
                                </Row>
                                <Row className="order">
                                    <Col md={3}>
                                        <img src={order.vehicleImg} alt="" />
                                    </Col>
                                    <Col md={3}>
                                        <h4>{vehiclesType}</h4>
                                    </Col>
                                    <Col md={3}>
                                        <h4>{order.sitCapacity} <FontAwesomeIcon icon={faUserCheck} /></h4> 
                                    </Col>
                                    <Col md={3}>
                                        <h3>{order.ticketFare}</h3>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    }
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