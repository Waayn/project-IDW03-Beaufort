import axios from 'axios';

export default class UserModel {

    login(infos) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.post('http://localhost:9000/.netlify/functions/server/login', { ...infos })
=======
                axios.post('http://localhost:1510/login', { ...infos })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    createUser(infos) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.post('http://localhost:9000/.netlify/functions/server/create/user', { ...infos })
=======
                axios.post('http://localhost:1510/create/user', { ...infos })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.post('http://localhost:9000/.netlify/functions/server/get/user', { id })
=======
                axios.post('http://localhost:1510/get/user', { id })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    setCapturedPokemons(id, capturedPokemons) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.patch('http://localhost:9000/.netlify/functions/server/user/capturedPokemons', { id, capturedPokemons })
=======
                axios.patch('http://localhost:1510/user/capturedPokemons', { id, capturedPokemons })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }

    deleteUser(infos) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                axios.post('http://localhost:9000/.netlify/functions/server/delete/user', { ...infos })
=======
                axios.post('http://localhost:1510/delete/user', { ...infos })
>>>>>>> parent of b27faa6 (netlify prepared)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }
}