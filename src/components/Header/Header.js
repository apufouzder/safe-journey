import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import './Header.css';

const Header = () => {
    const style = {
        color: 'black',
        fontSize: '20px'
    }

    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    return (
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
                <div className="container">
                    <Navbar.Brand style={style} to="#home">Safe Journey</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>
                            <Nav.Link style={style} as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link style={style} as={Link} to="/destination">Destination</Nav.Link>
                            <Nav.Link style={style} as={Link} to="/blog">Blog</Nav.Link>
                            <Nav.Link style={style} as={Link} to="/contact">Contact</Nav.Link>
                            <Nav.Link style={style} as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link style={style}>{loggedInUser.name}</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    );
};

export default Header;