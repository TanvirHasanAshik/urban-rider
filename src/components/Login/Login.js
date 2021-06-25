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

    const handleSubmit = () => {

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
        console.log("facebook signIn");
    }
    return (
        <div className="login-container">
            <Container>
                <Row>
                    <Col>
                        <form action="" onSubmit=''>
                            <h2>Create an account</h2>
                            <h6>Name</h6>
                            <input type="text" name="name" id="" /><br /><br />
                            <h6>Email</h6>
                            <input type="email" name="email" id="" /><br /><br />
                            <h6>Password</h6>
                            <input type="password" name="password" id="" /><br /><br />
                            <h6>Confirm Password</h6>
                            <input type="password" name="confirmPassword" id="" /><br />
                            <br />
                            <input className="submitBtn" type="submit" value="Create an account"/>
                            <NavLink onClick="clicked Me">Already have an account?</NavLink>
                        </form>
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