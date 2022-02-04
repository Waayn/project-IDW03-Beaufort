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
                    .catch(err => setError(err.response.data.error))
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

    return <Container className="d-flex align-items-center justify-content-center flex-column min-vh-100">
        <NotificationContainer />
        <h1 className="mb-4 poketitle">Registration</h1>
        <Form className="d-flex justify-content-center flex-column mb-4 w-100 pokeform" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control className="pokeinput w-100" type="email" placeholder="Enter your email address" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicText">
                <Form.Control className="pokeinput w-100" type="text" placeholder="Enter your username" name="username" value={infos.username} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <div className="position-relative">
                    <Form.Control className="pokeinput w-100" type={seePassword ? "text" : "password"} placeholder="Enter your password" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword2">
                <div className="position-relative">
                    <Form.Control className="pokeinput w-100 mb-2" type={seePassword2 ? "text" : "password"} placeholder="Confirm your password" name="password2" value={infos.password2} onChange={handlePassword2} />
                    {seePassword2 ? <i onClick={handleEye2} className="bi bi-eye eye-login"></i> : <i onClick={handleEye2} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "20px" }} className="w-100 text-center mb-3">{error}</Alert>}
            <Button variant="primary" type="submit" className="poke-fs w-75 mx-auto pokesubmit">Register</Button>
        </Form>
        <p className="poke-fs">Already have an account? <Link className="pokelink" to="/login">Log in</Link></p>
    </Container>
};

export default Register;
