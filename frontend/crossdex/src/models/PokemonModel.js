import axios from 'axios';

export default class PokemonModel {

    getAllPokemons() {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:9000/.netlify/functions/server/pokemons')
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
                axios.get('http://localhost:9000/.netlify/functions/server/pokemon/' + id)
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
                axios.post('http://localhost:9000/.netlify/functions/server/pokemons', { ids: [...ids] })
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }
}