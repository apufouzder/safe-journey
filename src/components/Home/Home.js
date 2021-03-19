import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import HeroImage from '../../images/HeroImage.png';
import SelectedCar from '../SelectedCar/SelectedCar';
import carData from '../../carData';
import './Home.css';

const Home = () => {
    const [selectCar, setSelectCar] = useState([]);

    useEffect(() => {
        setSelectCar(carData);
    }, [])
    return (
        <div className="hero-image" style={{ backgroundImage: `url(${HeroImage})` }}>
            <Header />
            <div className="container">
                <div className="container">
                    <div className="row py-5 mt-5">
                        {
                            selectCar.map(cars => <SelectedCar cars={cars}></SelectedCar>)

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;