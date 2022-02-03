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
        if (infos.email !== "" && infos.password !== "") {
            userModel.login(infos)
                .then(res => {
                    checkRemember === true ? setCookie('crossdex', res.data.id) : setCookie('crossdex', res.data.id, { expires: new Date(Date.now() + (3600 * 1000 * 25)) })
                    dispatch(setUserInfos(res.data))
                    navigate('/')
                })
                .catch(err => setError("Wrong email or password"))
        } else setError("Please fill in the fields")
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

    return <Container className="d-flex align-items-center justify-content-center flex-column min-vh-100">
        <h1 className="mb-4 poketitle">Login</h1>
        <Form className="d-flex justify-content-center flex-column mb-4 w-100 poke-fs" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control className="pokeinput w-100" type="email" placeholder="Enter your email" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <div className="position-relative">
                    <Form.Control className="pokeinput w-100" type={seePassword ? "text" : "password"} placeholder="Enter your password" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-100 mx-auto" controlId="formBasicCheckbox">
                <Form.Check className="d-flex justify-content-center align-items-center" type="checkbox" label="Remember me" value={checkRemember} onChange={() => setCheckRemember(!checkRemember)} />
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "20px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit" className="poke-fs w-75 mx-auto pokesubmit">Sign in</Button>
        </Form>
        <p className="poke-fs">You don't have an account ? <Link className="pokelink" to="/register">Register</Link></p>
    </Container>
}

export default Login;
