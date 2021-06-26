import React, { useContext, useState } from 'react';
import { NavLink, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css';
import fbIcon from '../../image/facebook.png';
import googleIcon from '../../image/google.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { ContextUser } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const[loggedInUser, setLoggedInUser] = useContext(ContextUser);
    const[newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        image: "",
        success: false
    });
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password === user.confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                console.log(res)
                const {displayName, email} = res.user
                user.name = displayName;
                user.email = email;
                user.isSignedIn = true;
                user.success = true;
                updateUser(user.name);
                setUser(user);
                setLoggedInUser(user);
                history.replace(from);   
            })
            .catch((error) => {
                user.name  = "";
                user.email = "";
                user.error = "please check your email or confirm password";
                user.isSignedIn = false;
                user.success = false;
                setUser(user);
                setLoggedInUser(user);
            });
        } 
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then( res => {
                const {displayName, email} = res.user;
                user.name = displayName;
                user.email = email;
                user.isSignedIn = true;
                user.success = true;
                setUser(user);
                setLoggedInUser(user);
                history.replace(from);
                console.log(res);
            })
            .catch((error) => {
                user.isSignedIn = false;
                user.success = false;
                user.error = error.message;
                setUser(user);
                setLoggedInUser(user);
            });
        }
        e.preventDefault();
    }
    const updateUser = (name) => {
        const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name
                }).then((res) => {  
                    
                }).catch((error) => {
                    console.log(error.message);
                });  
            }
    const handleBlur = (e) => {
        if(e.target.name === "name"){
            const signInUser = {...user};
            signInUser[e.target.name] = e.target.value;
            setUser(signInUser);
        }
        if(e.target.name === "email"){
            const email = /\S+@\S+\.\S+/.test(e.target.value);
            if(email){
                const signInUser = {...user};
                signInUser[e.target.name] = e.target.value;
                setUser(signInUser);
            }
        }
        if(e.target.name === "password"){
            const testPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value);
            if(testPassword){
                const signInUser = {...user};
                signInUser[e.target.name] = e.target.value;
                setUser(signInUser);
            }
        }
        if(e.target.name === "confirmPassword"){
            const testConfirmPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value);
            if(testConfirmPassword){
                const signInUser = {...user};
                signInUser[e.target.name] = e.target.value;
                setUser(signInUser);
            }
        }
    }
    const handleGoogleSign = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const{displayName, email, photoURL} = res.user;
            const signInUser = {...user};
            signInUser.isSignedIn = true;
            signInUser.name = displayName;
            signInUser.email = email;
            signInUser.image = photoURL;
            signInUser.success = true;
            setUser(signInUser);
            setLoggedInUser(signInUser);
            history.replace(from);
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleFacebookSign = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then((res) => {
            const{displayName, email, photoURL} = res.user;
            const signInUser = {...user};
            signInUser.isSignedIn = true;
            signInUser.name = displayName;
            signInUser.email = email;
            signInUser.image = photoURL;
            signInUser.success = true;
            setUser(signInUser);
            setLoggedInUser(signInUser);
            history.replace(from);
        })
        .catch((error) => {
           console.log("error",error.message)
        });
    }
    return (
        <div className="login-container">
            <Container>
                <Row>
                    <Col>
                        {
                            !newUser ? 
                            <form action="" onSubmit={handleSubmit}>
                                <h2>Login your account</h2>
                                <h6>Email</h6>
                                <input onBlur={handleBlur} type="email" name="email" id="" /><br /><br />
                                <h6>Password</h6>
                                <input onBlur={handleBlur} type="password" name="password" id="" />
                                <br />
                                <br />
                                <input className="submitBtn" type="submit" value="Login"/>
                                {!user.success && <span>{user.error}</span> }
                                <NavLink onClick={() =>setNewUser(!newUser)}>Create an account</NavLink>
                            </form>
                            :
                            <form action="" onSubmit={handleSubmit}>
                                { !user.success && <p style={{color:'red'}}>{user.error}</p> }
                                <h2>Create an account</h2>
                                <h6>Name</h6>
                                <input onBlur={handleBlur} type="text" name="name" id="" /><br /><br />
                                <h6>Email</h6>
                                <input onBlur={handleBlur} type="email" name="email" id="" /><br /><br />
                                <h6>Password</h6> {user.error}
                                <input onBlur={handleBlur} type="password" name="password" id="" />
                                <p>Min 8 characters, at least 1 letter and 1 number</p>
                                <h6>Confirm Password</h6> {user.error}
                                <input onBlur={handleBlur} type="password" name="confirmPassword" id="" /><br />
                                <br />
                                <input className="submitBtn" type="submit" value="Create an account"/>
                            </form>
                            
                            
                        }
                    </Col>
                </Row>
            </Container>
            <Container >
                <Row className="d-flex justify-content-center">
                    <Col md={5} className='signIn-btn'>
                        <p>________________ or ________________</p><br />
                        <Button onClick={handleGoogleSign}><img src={googleIcon} alt="" /> Sign In with Google</Button> <br /><br />
                        <Button onClick={handleFacebookSign}><img src={fbIcon} alt="" /> Sign In with Facebook</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;