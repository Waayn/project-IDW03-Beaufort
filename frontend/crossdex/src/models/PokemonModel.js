import axios from 'axios';

export default class PokemonModel {

    getAllPokemons() {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.get('http://localhost:9000/.netlify/functions/server/pokemons')
=======
                axios.get('http://localhost:1510/pokemons')
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    getPokemonById(id) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.get('http://localhost:9000/.netlify/functions/server/pokemon/' + id)
=======
                axios.get('http://localhost:1510/pokemon/' + id)
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    getPokemonsById(ids) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.post('http://localhost:9000/.netlify/functions/server/pokemons', { ids: [...ids] })
=======
                axios.post('http://localhost:1510/pokemons', { ids: [...ids] })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }
}