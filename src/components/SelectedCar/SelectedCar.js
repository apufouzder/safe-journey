import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './SelectedCar.css';


const SelectedCar = (props) => {
    const { category, name, img, price } = props.cars;
    const history = useHistory();

    const handleBooking = () => {
        history.push(`/destination/${category}`);
    }
    return (
        <>
            <Col md={3} sm={6} className="custom-style">
                <Card className="custom-card shadow mb-3">
                    <Link to={`/destination/${category}`}>
                        <Card.Img variant="top" src={img} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <h5>Price: {price}</h5>
                        <Button onClick={handleBooking} variant="warning">Book Now</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default SelectedCar;