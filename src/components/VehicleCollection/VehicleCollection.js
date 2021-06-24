import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './VehicleCollection.css';
const VehicleCollection = (props) => {
    console.log(props);
    const {image, vehiclesType} = props.ride;
    return (
        <div className="vehicle-container">
            <Link to={'/destination='+vehiclesType} >
                <img src={image} alt="" />
                <br />
                <h3>{vehiclesType}</h3>
            </Link>
        </div>
    );
};

export default VehicleCollection;