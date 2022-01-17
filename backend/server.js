import express from "express";
import dotenv from "dotenv";
import MongoDB from "./database/mongoDB.js";

dotenv.config()
const PORT = process.env.PORT
const URI = process.env.DB_HOST

const app = express()
const mongoDB = new MongoDB(URI)
mongoDB.connect()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/pokemons', (req, res) => {
    mongoDB.getAllPokemons()
        .then(pokemons => res.json(pokemons))
        .catch(error => res.json({ error }))
})

app.get('/pokemon/:pokemonId', (req, res) => {
    mongoDB.getPokemonById(req.params.pokemonId)
        .then(pokemon => res.json(pokemon))
        .catch(error => res.json({ error }))
})