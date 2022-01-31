import React, { useEffect, useState } from 'react';
import PokemonModel from '../models/PokemonModel';
import Pagination from './../components/Pagination';
import PokemonCard from './../components/PokemonCard';
import { Row } from 'react-bootstrap';

const Home = () => {

    const [pokemons, setPokemons] = useState([])
    const pokemonModel = new PokemonModel()
    const [pagination, setPagination] = useState({
        start: 0,
        end: 36
    })

    useEffect(() => {
        pokemonModel.getAllPokemons()
            .then(res => setPokemons(res.data))
        //eslint-disable-next-line
    }, [])

    const changePage = (page) => {
        setPagination({ start: page * 36 - 36, end: page * 36 })
    }

    return <>
        {pokemons.length === 0 ? <h1>Something went wrong, try again.</h1> :
            <div className="mb-4">
                <Row className="mx-auto d-flex w-100">
                    {pokemons.slice(pagination.start, pagination.end).map(pokemon => {
                        return <PokemonCard pokemon={pokemon} key={pokemon.id} />
                    })}
                </Row>
                <Pagination items={pokemons.length} itemsPerPage={36} onChange={changePage} />
            </div>
        }
    </>
};

export default Home;
