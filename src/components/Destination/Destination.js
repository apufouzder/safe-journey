import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MapImg from '../../images/Map.png'
import './Destination.css';
import { useHistory, useParams } from 'react-router';
import { MyContext } from '../../App';
import Map from '../../components/Map/Map';
import Footer from '../Footer/Footer';


const Destination = () => {
    const { category } = useParams();
    const history = useHistory();

    const handleBooking = () => {
        history.push(`/${category}`)
    }

    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    return (
        <>
            <Container>
                <Row className="py-5">
                    <Col md={4} className="mb-5">
                        {loggedInUser && <div className="booking-area">
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
                        </div>}
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

export default Destination;