import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import Map from '../../images/Map.png'
import { useEffect, useState } from 'react';
import './Destination.css';
import { useHistory, useParams } from 'react-router';
import { FaUserFriends } from 'react-icons/fa';
import carDetailsData from '../../carDetailsData';


const Destination = () => {
    const { category } = useParams();
    const history = useHistory();

    const handleBooking = () => {
        history.push(`/${category}`)
    }

    // const [carCategory, setCarCategory] = useState([]);
    // useEffect(() => {
    //     setCarCategory(carDetailsData.filter(car => car.category === category));
    // }, [category])
    // console.log('carCategory', carCategory);

    return (
        <>

            <Container>
                <Row className="py-5">
                    <Col md={4} className="mb-5">
                        <div className="booking-area">
                            <form>
                                <label htmlFor="">Pick From</label>
                                <br />
                                <input className="inputStyle" defaultValue="Dhaka" type="text" />
                                <br />
                                <label htmlFor="">Pick To</label>
                                <br />
                                <input className="inputStyle" defaultValue="Khulna" type="text" />
                                <br />
                                <label htmlFor="fromData">From</label><br />
                                <input type="date" name="" id="fromData" />
                                <br />
                                <label htmlFor="toData">To</label><br />
                                <input type="date" name="" id="toData" />
                                <br /><br />
                                <button className="btn-booking" onClick={handleBooking}>Search</button>
                            </form>

                            {/* {
                                carCategory.map(car => <div className="small-card">
                                    <img src={car.img} alt="" />
                                    <h5>{car.category}</h5>
                                    <p><FaUserFriends /> {car.people}</p>
                                    <p>${car.price}</p>
                                </div>
                                )
                            } */}
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

export default Destination;