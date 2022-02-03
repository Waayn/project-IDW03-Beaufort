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
                <Col xs={3} className="d-block d-md-none mt-2">
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
        </div> : <Loader />}
    </>
    }
    </>
};

export default PokemonView;
