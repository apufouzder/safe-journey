import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '550px'
};

const location = {
    lat: 22.845640,
    lng: 89.540329
};

const onLoad = marker => {
    console.log('marker: ', marker)
}

const Map = () => {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDNOZWiE0OqHmcf_1pIja9DM22VJLNaog0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
            >
                <Marker
                    onLoad={onLoad}
                    position={location}
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;