import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import carDetailsData from '../../carDetailsData';
import './Category.css';
import { FaUserFriends } from 'react-icons/fa';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';

const Category = (props) => {
    console.log('props', props);
    const { carDetails } = useParams();

    const [carCategory, setCarCategory] = useState([]);
    useEffect(() => {
        setCarCategory(carDetailsData.filter(car => car.category === carDetails));
    }, [carDetails])

    return (
        <>
            <Container>
                <Row className="py-5">
                    <Col md={4} className="mb-5">
                        <div className="booking-area">
                            <div className="area">
                                <h5>Dhaka</h5>
                                <br />
                                <h5>Khulna</h5>
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
                        {/* <img src={Map} alt="" /> */}
                        <Map />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Category;