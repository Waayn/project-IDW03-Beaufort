const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const Pokemon = require("../database/models/Pokemon.js");
const User = require("../database/models/User.js");
const serverless = require('serverless-http');

dotenv.config()
// const URI = process.env.DB_HOST
const URI = 'mongodb+srv://Waayn:Ronandu13@cluster0.fayyi.mongodb.net/projectIDW03?retryWrites=true&w=majority'
// const SALT = process.env.SALT
const SALT = '8d1ee9f20a10fe5a1e9bf6b47f5aa0e5'

const app = express()
const router = express.Router();
const pokemonDB = new Pokemon(URI)
pokemonDB.connect()
const userDB = new User(URI, SALT)
userDB.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join('./index.html')));

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

//------------------------  USER  ------------------------

router.get('/', (req, res) => {
    res.json({ 'hello': 'hi' })
})

router.post('/create/user', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: 'Error. Please enter a username, an email and a password' })
    }
    userDB.createUser({ username: req.body.username, password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

router.post('/delete/user', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter an email and a password' })
    }
    userDB.deleteUser({ password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter a username and a password' })
    }
    userDB.login({ email: req.body.email, password: req.body.password })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

router.post('/get/user', (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ message: 'Error. Please enter an id' })
    }
    userDB.getUserById(req.body.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

router.patch('/user/capturedPokemons', (req, res) => {
    if (!req.body.id || !req.body.capturedPokemons) {
        return res.status(400).json({ message: 'Error. Please enter an id and an array of captured pokemons' })
    }
    userDB.setCapturedPokemons(req.body.id, req.body.capturedPokemons)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

//------------------------  POKEMON  ------------------------


router.get('/pokemons', (req, res) => {
    pokemonDB.getAllPokemons()
        .then(pokemons => res.status(200).json(pokemons))
        .catch(error => res.status(500).json(error))
})

router.get('/pokemon/:pokemonId', (req, res) => {
    pokemonDB.getPokemonById(req.params.pokemonId)
        .then(pokemon => res.status(200).json(pokemon))
        .catch(error => res.status(500).json(error))
})

router.post('/pokemons', (req, res) => {
    if (!req.body.ids) {
        return res.status(400).json({ message: 'Error. Please enter ids' })
    }
    pokemonDB.getPokemonsById(req.body.ids)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

module.exports.handler = serverless(app);