import React, { useState } from 'react';
import { Image, Col } from 'react-bootstrap';
import Pokeball from '../assets/images/pokeball.png';
import { useSelector } from 'react-redux';
import UserModel from '../models/UserModel';
import { useDispatch } from 'react-redux';
import { setUserInfos } from '../app/store';
import PokeModal from '../components/PokeModal';

const PokemonCard = (props) => {

    const user = useSelector(state => state.user)
    const userModel = new UserModel()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const isCaptured = () => {
        return user.capturedPokemons.includes(props.pokemon.id)
    }

    const setCaptured = () => {
        userModel.setCapturedPokemons(user.id, [...user.capturedPokemons, props.pokemon.id])
            .then(res => dispatch(setUserInfos(res.data)))
    }

    const unsetCaptured = () => {
        userModel.setCapturedPokemons(user.id, user.capturedPokemons.filter(p => p !== props.pokemon.id))
            .then(res => dispatch(setUserInfos(res.data)))
    }

    return <>{user ?
        <Col xs={6} sm={4} md={3} xl={2} style={{ height: "230px" }}>
            <div className={"pokemon-card mt-4 py-3 mx-auto position-relative pokebg-" + props.pokemon.type[0]} onClick={() => setShowModal(true)}>
                <Image className={"mx-auto d-block w-75 " + (isCaptured() ? "" : "poke-disabled")} src={props.pokemon.thumbnail} alt={props.pokemon.name.english} />
                <Image src={Pokeball} className={"pokeball-validation position-absolute " + (isCaptured() ? "" : "no-ball")} />
                <p className="pokemon-name text-center pt-3">{props.pokemon.name.english}</p>
            </div>
            <PokeModal captured={isCaptured()} pokemon={props.pokemon} showModal={showModal} setShowModal={setShowModal} unsetCaptured={unsetCaptured} setCaptured={setCaptured} />
        </Col >
        : <></>
    }</>
};

export default PokemonCard;
