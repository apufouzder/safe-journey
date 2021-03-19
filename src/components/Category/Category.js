import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import Map from '../../images/Map.png';
import carDetailsData from '../../carDetailsData';
import './Category.css';
import { FaUserFriends } from 'react-icons/fa';


const Category = (props) => {
    console.log('props', props);
    const { carDetails } = useParams();

    const [carCategory, setCarCategory] = useState([]);
    useEffect(() => {
        setCarCategory(carDetailsData.filter(car => car.category === carDetails));
    }, [carDetails])
    console.log('carCategory', carCategory);

    return (
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <div className="booking-area">
                            <div className="area">
                                <h6>Dhaka</h6>
                                <h6>Khulna</h6>
                            </div>
                            {
                                carCategory.map(car => <div className="small-card">
                                    <img src={car.img} alt="" />
                                    <h5>{car.category}</h5>
                                    <p><FaUserFriends /> {car.people}</p>
                                    <p>${car.price}</p>
                                </div>
                                )
                            }
                        </div>

                    </Col>
                    <Col md={8}>
                        <img src={Map} alt="" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Category;