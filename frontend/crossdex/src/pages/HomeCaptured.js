import React, { useEffect, useState } from 'react';
import PokemonModel from '../models/PokemonModel';
import Pagination from './../components/Pagination';
import PokemonCard from './../components/PokemonCard';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useCookies } from 'react-cookie';
import Logo from '../assets/images/logo-crossdex.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeCaptured = () => {

    const [pokemons, setPokemons] = useState([])
    const pokemonModel = new PokemonModel()
    const [pagination, setPagination] = useState({
        start: 0,
        end: 36
    })
    const [error, setError] = useState(false)
    const [searchedPokemon, setSearchedPokemon] = useState('')
    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const [currentPage, setCurrentPage] = useState(1)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.capturedPokemons) pokemonModel.getAllPokemons()
            .then(res => {
                const capturedPokemons = res.data.filter(pokemon => isCaptured(pokemon.id))
                setPokemons(capturedPokemons)
            })
            .catch(err => setError('Something went wrong, try again.'))
        //eslint-disable-next-line
    }, [user.capturedPokemons])

    const isCaptured = (id) => {
        return user.capturedPokemons.includes(id)
    }

    const logout = () => {
        setCookie('crossdex', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) })
    }

    const changePage = (page) => {
        setPagination({ start: page * 36 - 36, end: page * 36 })
    }

    const handleSearchPokemon = (event) => {
        setPagination({ start: 0, end: 36 })
        setCurrentPage(1)
        setSearchedPokemon(event.target.value)
    }


    const filteredPokemons = pokemons.filter(p => {
        return p.name.english.toLowerCase().includes(searchedPokemon.toLowerCase())
    })

    return <>
        {error ? <h1 className="mt-4 mx-auto">{error}</h1> : <>
            {pokemons.length !== 0 ?
                <div>
                    <img src={Logo} alt="Logo Crossdex" style={{ cursor: "pointer" }} onClick={() => navigate('/')} className="mw-100 mx-auto d-block" />
                    <h1 className="w-100 text-center pokeslogan fw-bold pb-4">The cross-generation pokédex !</h1>
                    <input placeholder="Find a pokemon" type="text" className="mt-4 mb-5 mx-auto d-block pokeinput" value={searchedPokemon} onChange={handleSearchPokemon} />
                    <Row className="mx-auto d-flex w-100">
                        {filteredPokemons.slice(pagination.start, pagination.end).map(pokemon => {
                            return <PokemonCard pokemon={pokemon} key={pokemon.id} />
                        })}
                        {filteredPokemons.length === 0 &&
                            <h3 className="w-100 text-center pokeslogan fw-bold" style={{ fontSize: "30px" }}>No pokemon match your search</h3>
                        }
                    </Row>
                    {filteredPokemons.length !== 0 &&
                        <Pagination items={filteredPokemons.length} itemsPerPage={36} onChange={changePage} currentPage={currentPage} setCurrent={setCurrentPage} />
                    }
                    <div className="w-100">
                        <button className="btn-pokemodal-cancel mx-auto mb-5 mt-5 pt-1 d-block" onClick={logout}>Logout
                            <i className="bi bi-box-arrow-right ms-3 pokelogout" style={{ fontSize: "20px" }}></i>
                        </button>
                    </div>
                </div>
                : <Loader />}
        </>}
    </>
};

export default HomeCaptured;
