import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Pokemon from "./database/models/Pokemon.js";
import User from "./database/models/User.js";

dotenv.config()
const PORT = process.env.PORT
const URI = process.env.DB_HOST
const SALT = process.env.SALT

const app = express()
const pokemonDB = new Pokemon(URI)
pokemonDB.connect()
const userDB = new User(URI, SALT)
userDB.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//------------------------  USER  ------------------------

app.post('/create/user', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: 'Error. Please enter a username, an email and a password' })
    }
    userDB.createUser({ username: req.body.username, password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.post('/delete/user', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter an email and a password' })
    }
    userDB.deleteUser({ password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter a username and a password' })
    }
    userDB.login({ email: req.body.email, password: req.body.password })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.post('/get/user', (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ message: 'Error. Please enter an id' })
    }
    userDB.getUserById(req.body.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.patch('/user/capturedPokemons', (req, res) => {
    if (!req.body.id || !req.body.capturedPokemons) {
        return res.status(400).json({ message: 'Error. Please enter an id and an array of captured pokemons' })
    }
    userDB.setCapturedPokemons(req.body.id, req.body.capturedPokemons)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

//------------------------  POKEMON  ------------------------


app.get('/pokemons', (req, res) => {
    pokemonDB.getAllPokemons()
        .then(pokemons => res.status(200).json(pokemons))
        .catch(error => res.status(500).json(error))
})

app.get('/pokemon/:pokemonId', (req, res) => {
    pokemonDB.getPokemonById(req.params.pokemonId)
        .then(pokemon => res.status(200).json(pokemon))
        .catch(error => res.status(500).json(error))
})

app.post('/pokemons', (req, res) => {
    if (!req.body.ids) {
        return res.status(400).json({ message: 'Error. Please enter ids' })
    }
    pokemonDB.getPokemonsById(req.body.ids)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})