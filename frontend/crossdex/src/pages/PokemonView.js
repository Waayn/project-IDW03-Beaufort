import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PokemonModel from '../models/PokemonModel';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { Col, Row } from 'react-bootstrap';

const PokemonView = () => {

    const user = useSelector(state => state.user)
    const params = useParams()
    const [pokemon, setPokemon] = useState({})
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const pokemonModel = new PokemonModel()

    useEffect(() => {
        if (user.capturedPokemons) pokemonModel.getPokemonById(params.pokemonId)
            .then(res => checkData(res.data[0]))
            .catch(err => { console.log(err); setError('Something went wrong, try again.') })
        //eslint-disable-next-line
    }, [user.capturedPokemons])

    const isCaptured = (id) => {
        return user.capturedPokemons.includes(id)
    }

    const checkData = (data) => {
        if (!isCaptured(data.id)) navigate('/')
        else setPokemon(data)
    }

    return <>{error ? <h1>{error}</h1> : <>
        {Object.keys(pokemon).length !== 0 ? <div>
            {console.log(pokemon)}
            <Row>
                <Col xs={3} className="d-block d-md-none mt-3">
                    <Link to={'/'} className="pokeback d-flex ms-3 me-2">
                        <i className="bi bi-chevron-left me-1 pokehoverlink" style={{ fontSize: '15px' }}></i>
                        <p className="d-block mt-1 pokehoverlink">Home</p>
                    </Link>
                </Col>
                <Col xs={3} className="d-none d-md-block mt-3">
                    <Link to={'/'} className="pokeback d-flex ms-3">
                        <i className="bi bi-chevron-left me-1" id={'pokehoverlink'} style={{ fontSize: '20px' }}></i>
                        <p className="d-block" id={'pokehoverlink2'} style={{ marginTop: '6px' }}>Home</p>
                    </Link>
                </Col>
                <Col xs={12} md={6} className="">
                    <h1 className="text-center pokeslogan fw-bold mt-3" style={{ fontSize: '50px' }}>{pokemon.name.english}</h1>
                </Col>
            </Row>
            <div className="pokeviewdiv mx-auto">
                {/* -----------  Presentation ----------- */}
                <img src={pokemon.thumbnail} alt={'Pokemon'} className="mt-3 mx-auto d-block" />
                <p className="m-0 p-0 mt-3 fw-bold" style={{ fontSize: "24px" }}>{pokemon.species}</p>
                <div className="mt-1 mx-4 mb-3">{pokemon.description}</div>
                {pokemon.type.map(t => {
                    return <p key={t} className={"m-0 w-50 mx-auto text-white p-0 pokebg-" + t}>{t}</p>
                })}
                <Row className="w-75 pb-3 pt-5 mx-auto pokeborder">
                    <Col xs={6}>Height: {pokemon.profile.height}</Col>
                    <Col xs={6}>Weight: {pokemon.profile.weight}</Col>
                </Row>
                <Row className="w-75 pb-3 pt-3 mx-auto pokeborder">
                    <Col xs={6}><h2 className="fw-bold">Abilities</h2> {pokemon.profile.ability.map(a => <p key={a[0]} className="m-0 p-0">{a[0]}</p>)}</Col>
                    <Col xs={6}><h2 className="fw-bold">Egg</h2> {pokemon.profile.egg.map(e => <p key={e} className="m-0 p-0">{e}</p>)}</Col>
                </Row>

                <Row className="w-75 pb-3 pt-3 mx-auto pokeborder">
                    {/* -----------  Names ----------- */}
                    <Col xs={6}>
                        <h2 className="fw-bold">Names</h2>
                        <div className="m-0 p-0 mb-2">French: <p className="m-0 p-0">{pokemon.name.french}</p></div>
                        <div className="m-0 p-0 mb-2">Japanese: <p className="m-0 p-0" style={{ fontSize: "13px" }}>{pokemon.name.japanese}</p></div>
                        <div className="m-0 p-0">Chinese: <p className="m-0 p-0" style={{ fontSize: "13px" }}>{pokemon.name.chinese}</p></div>
                    </Col>

                    {/* -----------  Stats ----------- */}
                    <Col xs={6}>
                        <h2 className="fw-bold">Base stats</h2>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[0]}: {Object.values(pokemon.base)[0]}</p>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[1]}: {Object.values(pokemon.base)[1]}</p>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[2]}: {Object.values(pokemon.base)[2]}</p>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[3]}: {Object.values(pokemon.base)[3]}</p>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[4]}: {Object.values(pokemon.base)[4]}</p>
                        <p className="m-0 p-0">{Object.keys(pokemon.base)[5]}: {Object.values(pokemon.base)[5]}</p>
                    </Col>

                </Row>
            </div>
        </div> : <Loader />}
    </>
    }
    </>
};

export default PokemonView;
