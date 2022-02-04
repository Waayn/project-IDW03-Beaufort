import React, { useState } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserModel from './../models/UserModel';
import { useCookies } from 'react-cookie';

const DeleteUserModal = (props) => {

    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const userModel = new UserModel()
    const user = useSelector(state => state.user)
    const [seePassword, setSeePassword] = useState(false)
    const [error, setError] = useState("")
    const [password, setPassword] = useState('')

    const handleEye = () => {
        setSeePassword(!seePassword)
    }

    const handlePassword = ({ target: { value } }) => {
        setError("")
        setPassword(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== "") {
            userModel.deleteUser({ email: user.email, password })
                .then(res => setCookie('crossdex', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) }))
                .catch(err => setError(err.response.data.error))
        } else setError("Please enter your password")
    }

    return <Modal className="text-center" show={props.showModal} onHide={() => props.setShowModal(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
        <h2 className="mt-4 mb-4 fw-bold" style={{ fontSize: '35px' }}>Delete account {user.username}</h2>
        <Form className="d-flex justify-content-center flex-column mb-4 w-100 poke-fs mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicPassword">
                <div className="position-relative">
                    <Form.Control className="pokeinput w-100" type={seePassword ? "text" : "password"} placeholder="Enter your password" name="password" value={password} onChange={handlePassword} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "20px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit" className="poke-fs w-75 mx-auto pokesubmit">Delete</Button>
        </Form>
    </Modal>
}

export default DeleteUserModal;
