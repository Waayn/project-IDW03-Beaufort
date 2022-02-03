import axios from 'axios';

export default class PokemonModel {

    getAllPokemons() {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:1510/pokemons')
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
                axios.get('http://localhost:1510/pokemon/' + id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }
}