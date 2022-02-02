import React from 'react';
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const PokeModal = (props) => {

    const navigate = useNavigate()

    const handleSuccess = () => {
        if (!props.captured) {
            props.setCaptured()
            props.setShowModal(false)
        } else navigate(`/pokemon/${props.pokemon.id}`)
    }

    const handleUnset = () => {
        props.unsetCaptured()
        props.setShowModal(false)
    }

    return <>{props.captured ?
        <Modal className="text-center" show={props.showModal} onHide={() => props.setShowModal(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
            <h2 className="mt-4 mb-4 fw-bold" style={{ fontSize: '35px' }}>{props.pokemon.name.english}</h2>
            <div style={{ height: "55px" }} className="d-flex justify-content-around w-100 mx-auto mb-5 mt-4 pb-2 flex-column">
                <button className="btn-pokemodal-yes mx-auto my-2" onClick={handleSuccess}>See {props.pokemon.name.english}'s page</button>
                <button className="btn-pokemodal-cancel mx-auto my-2" onClick={handleUnset}>Unset caught</button>
            </div>
        </Modal>
        :
        <Modal className="text-center" show={props.showModal} onHide={() => props.setShowModal(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
            <h2 className="mt-4 mb-4 fw-bold" style={{ fontSize: '35px' }}>Did you catch {props.pokemon.name.english}?</h2>
            <div style={{ height: "55px" }} className="d-flex justify-content-around w-100 mx-auto mb-5 mt-4 flex-column">
                <button className="btn-pokemodal-yes mx-auto my-2" onClick={handleSuccess}>Yes</button>
                <button className="btn-pokemodal-cancel mx-auto my-2" onClick={() => props.setShowModal(false)}>Cancel</button>
            </div>
        </Modal>
    }</>
};

export default PokeModal;
