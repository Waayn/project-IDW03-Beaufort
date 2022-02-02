import React, { useEffect, useState } from 'react';
import PokemonModel from '../models/PokemonModel';
import Pagination from './../components/Pagination';
import PokemonCard from './../components/PokemonCard';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useCookies } from 'react-cookie';

const Home = () => {

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

    useEffect(() => {
        pokemonModel.getAllPokemons()
            .then(res => setPokemons(res.data))
            .catch(err => setError('Something went wrong, try again.'))
        //eslint-disable-next-line
    }, [])

    const logout = () => {
        setCookie('crossdex', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) })
    }

    const changePage = (page) => {
        setPagination({ start: page * 36 - 36, end: page * 36 })
    }

    const handleSearchPokemon = (event) => {
        setSearchedPokemon(event.target.value)
    }


    const filteredPokemons = pokemons.filter(p => {
        return p.name.english.toLowerCase().includes(searchedPokemon.toLowerCase())
            || p.name.french.toLowerCase().includes(searchedPokemon.toLowerCase())
    })

    return <>
        {error ? <h1>{error}</h1> : <>
            {pokemons.length !== 0 ?
                <div className="mb-4">
                    <input placeholder="Find a pokemon" type="text" className="mt-4 mb-4 mx-auto d-block pokeinput" value={searchedPokemon} onChange={handleSearchPokemon} />
                    <Row className="mx-auto d-flex w-100">
                        {filteredPokemons.slice(pagination.start, pagination.end).map(pokemon => {
                            return <PokemonCard pokemon={pokemon} key={pokemon.id} />
                        })}
                    </Row>
                    <Pagination items={filteredPokemons.length} itemsPerPage={36} onChange={changePage} />
                    <div className="w-100">
                        <button className="btn-pokemodal-cancel mx-auto mb-3 mt-5 pt-1 d-block" onClick={logout}>Logout
                            <i className="bi bi-box-arrow-right ms-3 pokelogout" style={{ fontSize: "20px" }}></i>
                        </button>
                    </div>
                </div>
                : <Loader />}
        </>}
    </>
};

export default Home;
