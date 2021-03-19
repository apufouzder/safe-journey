import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './SelectedCar.css';

const SelectedCar = (props) => {
    const { category, name, img } = props.cars;


    return (
        <>
            <Col md={3} className="custom-style">
                <Card className="custom-card">
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