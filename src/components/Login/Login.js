import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { MyContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Google from '../../images/google.png';
import { FaFacebook } from 'react-icons/fa';



!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const refPassword = useRef();
    const refConfirmPassword = useRef();
    const [error, setError] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        newUser: false,
        isSingIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        confirmPassword: '',
        success: false
    });

    const handleGoogleLogIn = () => {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
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

    const handleFacebookLogIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var { displayName, email } = result.user;
                const singInUser = { name: displayName, email }
                setLoggedInUser(singInUser);
                history.replace(from);
                console.log(singInUser);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var credential = error.credential;
                console.log(errorCode, errorMessage, credential);
            });
    }

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

        if (newUser && user.email && user.password === user.confirmPassword) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { displayName, email } = res.user;
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

        } else {
            setError("Password doesn't match!");
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { displayName, email } = res.user;
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
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                    console.log('error logIn', error);
                });
            setError("");
        }
        e.preventDefault();
    }


    const updateUserProfile = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(res => {
            console.log('update success', res);
        }).catch(error => {
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
                <h5>{newUser ? 'Create an account' : 'Login'}</h5>
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
                        ? 'Create an account'
                        : 'Login'}
                />
                <hr />
                <p className="text-center">
                    {newUser
                        ? "Already have an account"
                        : "Don't have an account?"}

                    <a href="/"
                        className="text-decoration-none"
                        onClick={(e) => {
                            e.preventDefault();
                            setNewUser(!newUser)
                        }}
                    >
                        {newUser ? ' Login' : ' Create an account'}
                    </a>
                </p>


                <div className="google">
                    <button
                        className="googleBtn"
                        onClick={handleGoogleLogIn}>
                        <span>
                            <img src={Google} alt="" />
                        </span>
                    Continue with Google
                    </button>
                    <button
                        className="googleBtn"
                        onClick={handleFacebookLogIn}>
                        <span className="facebook">
                            <FaFacebook />
                        </span>
                    Continue with Facebook
                    </button>
                </div>
            </form>

        </>
    );
};

export default Login;