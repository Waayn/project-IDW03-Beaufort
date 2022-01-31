import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { setUserInfos } from '../app/store';
import { useDispatch } from 'react-redux';
import UserModel from '../models/UserModel';

const Login = () => {

    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const [infos, setInfos] = useState({
        email: "",
        password: ""
    })
    const [checkRemember, setCheckRemember] = useState(false)
    const [error, setError] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userModel = new UserModel()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (infos.email !== "" && infos.password !== "")
            userModel.login(infos)
                .then(res => {
                    checkRemember === true ? setCookie('crossdex', res.data.id) : setCookie('crossdex', res.data.id, { expires: new Date(Date.now() + (3600 * 1000 * 25)) })
                    dispatch(setUserInfos(res.data))
                    navigate('/')
                })
                .catch(err => setError("Wrong email or password"))
    }

    const handleInfos = ({ target: { name, value } }) => {
        setError("")
        setInfos({
            ...infos,
            [name]: value
        })
    }

    const handleEye = () => {
        setSeePassword(!seePassword)
    }

    return <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
        <h1 className="mb-5">Login</h1>
        <Form className="d-flex justify-content-center flex-column mb-5 w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword ? "text" : "password"} placeholder="Enter your password" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-50 mx-auto" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" value={checkRemember} onChange={() => setCheckRemember(!checkRemember)} />
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "13px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit">
                Sign in
            </Button>
        </Form>
        <p>You don't have an account ? <Link to="/register">Register</Link></p>
    </Container>
}

export default Login;
