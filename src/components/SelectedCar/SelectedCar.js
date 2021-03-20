import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SelectedCar.css';


const SelectedCar = (props) => {
    const { category, name, img } = props.cars;

    return (
        <>
            <Col md={3} className="custom-style">
                <Card className="custom-card shadow mb-3">
                    <Link to={`/destination/${category}`}>
                        <Card.Img variant="top" src={img} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default SelectedCar;