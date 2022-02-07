import axios from 'axios';

export default class UserModel {

    login(infos) {
        return new Promise((resolve, reject) => {
            try {
                axios.post('http://localhost:1510/login', { ...infos })
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
                axios.post('http://localhost:1510/create/user', { ...infos })
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
                axios.post('http://localhost:1510/get/user', { id })
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
                axios.patch('http://localhost:1510/user/capturedPokemons', { id, capturedPokemons })
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
                axios.post('http://localhost:1510/delete/user', { ...infos })
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } catch (err) {
                reject({ error: "Unable to access server" })
            }
        })
    }
}