import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { MyContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

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
        if (e.target.name === 'password' === e.target.name === 'confirmPassword') {
            const passValidation = e.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = passValidation && passHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (user.email && user.password) {
            console.log('object');
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    var { displayName, email } = res.user;
                    const singInUser = { name: displayName, email, }
                    setLoggedInUser(singInUser);
                    // history.replace(from);
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
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    var { displayName, email } = res.user;
                    const singInUser = { name: displayName, email }
                    setLoggedInUser(singInUser);
                    // history.replace(from);
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

                    console.log('error logIn', error);
                });
        }
        e.preventDefault();
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
        <div>
            <Header />
            <h1>This is LogIn page: {loggedInUser.email}</h1>
            <form className="form-style" onSubmit={handleSubmit}>
                {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" /> */}
                <label htmlFor="">New User Sing Up</label>
                <br />
                {newUser && <input type="text" name="name" placeholder="Name" />}
                <br />
                <input type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                <br />

                <br />
                <input type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
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
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully!</p>}
                <button onClick={handleGoogleSingIn}>Google Sing In</button>
            </form>

        </div>
    );
};

export default Login;