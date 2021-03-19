import React, { useContext, useRef, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { MyContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FaGoogle } from 'react-icons/fa';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSingIn = () => {
        var GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                var { displayName, email } = result.user;
                const singInUser = { name: displayName, email }
                setLoggedInUser(singInUser);
                history.replace(from);
                console.log(singInUser);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var credential = error.credential;
                console.log(errorCode, errorMessage, credential);
            });
    }


    const refPassword = useRef();
    const refConfirmPassword = useRef();
    const [error, setError] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        newUser: false,
        name: '',
        email: '',
        password: '',
        error: '',
        confirmPassword: '',
        success: false
    });

    const handleBlur = (e) => {
        let isFormValid = true;

        console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passValidation = e.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = passValidation && passHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        // if (refPassword.current.value !== refConfirmPassword.current.value) {
        //     return setError("password not match");
        // } else {
        //     console.log(error);
        //     setError("");
        // }
    }

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);

        if (user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password, user.name)
                .then(res => {
                    var { displayName, email } = res.user;
                    const singInUser = { name: displayName, email, }
                    setLoggedInUser(singInUser);
                    history.replace(from);
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserProfile(user.name);

                    console.log('user singUp', singInUser);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                    console.log('error up', error);
                });
            e.preventDefault();
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    var { displayName, email } = res.user;
                    const singInUser = { name: displayName, email }
                    setLoggedInUser(singInUser);
                    history.replace(from);
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserProfile(user.name);

                    console.log('user logIn', singInUser);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    setError()
                    console.log('error logIn', error);
                });
            e.preventDefault();
        }

    }

    const updateUserProfile = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(res => {
            console.log('update success', res);
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <>

            <h1>This is LogIn page: {loggedInUser.name}</h1>

            <form className="form-style shadow" onSubmit={handleSubmit}>
                {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" /> */}
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>You {newUser ? 'Sing Up' : 'Logged In'} successfully!</p>}
                <label htmlFor="">New User Sing Up</label>
                <br />
                {
                    newUser && <input
                        type="text"
                        name="name"

                        placeholder="Name"
                        className="form-control"
                    />
                }
                <br />
                <input
                    type="email"
                    onChange={handleBlur}
                    name="email"
                    placeholder="Email"

                    className="form-control"
                    required />
                <br />

                <input
                    type="password"
                    onChange={handleBlur}
                    name="password"
                    placeholder="Password"
                    ref={refPassword}
                    className="form-control"
                    required />
                <br />
                {
                    newUser && <input
                        type="password"
                        onChange={handleBlur} name="confirmPassword"
                        placeholder="Confirm Password"
                        ref={refConfirmPassword}
                        className="form-control"
                        required
                    />
                }
                <p style={{ color: 'red' }}>{error}</p>

                <input
                    className="submitBtn"
                    type="submit"
                    value={newUser
                        ? 'Sing Up'
                        : 'Sing In'}
                />
                <hr />
                <p className="text-center">
                    {newUser
                        ? "Already have an account"
                        : "Don't have an account"}

                    <a href="/"
                        className="text-decoration-none"
                        onClick={(e) => {
                            e.preventDefault();
                            setNewUser(!newUser)
                        }}
                    >
                        {newUser ? ' Sing In' : ' Sing Up'}
                    </a>
                </p>
                <span></span>or<span></span>

                <div className="google">
                    <button className="googleBtn" onClick={handleGoogleSingIn}><span><img src="https://i.pinimg.com/originals/39/21/6d/39216d73519bca962bd4a01f3e8f4a4b.png" alt="" /></span> Google Sing In</button>
                </div>
            </form>

        </>
    );
};

export default Login;