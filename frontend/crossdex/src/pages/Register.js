import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UserModel from '../models/UserModel';

const Register = () => {

    const [infos, setInfos] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const navigate = useNavigate()
    const userModel = new UserModel()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (infos.username !== "" && infos.email !== "" && infos.password !== "" && password2 !== "") {
            if (infos.password === password2) {
                userModel.createUser(infos)
                    .then(res => {
                        NotificationManager.success(`Account ${infos.username} created`, 'Success')
                        setTimeout(() => { navigate('/login') }, 2000)
                    })
            } else setError("Passwords do not match")
        } else setError("Please fill in the fields")
    }

    const handleInfos = ({ target: { name, value } }) => {
        setError("")
        setInfos({
            ...infos,
            [name]: value
        })
    }

    const handlePassword2 = (event) => {
        setPassword2(event.target.value)
        setError("")
    }

    const handleEye = () => {
        setSeePassword(!seePassword)
    }

    const handleEye2 = () => {
        setSeePassword2(!seePassword2)
    }

    return <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
        <NotificationContainer />
        <h1 className="mb-5">Registration</h1>
        <Form className="d-flex justify-content-center flex-column mb-5 w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name="username" value={infos.username} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword ? "text" : "password"} placeholder="Enter your password" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Confirm the password</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword2 ? "text" : "password"} placeholder="Enter your password" name="password2" value={infos.password2} onChange={handlePassword2} />
                    {seePassword2 ? <i onClick={handleEye2} className="bi bi-eye eye-login"></i> : <i onClick={handleEye2} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "13px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
    </Container>
};

export default Register;
