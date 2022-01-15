import express from "express";
import dotenv from "dotenv";
// import fetch from "node-fetch";
import fs from "fs";

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/pokemon/:pokemonName', (req, res) => {
    const data = fs.readFileSync('./data/pokedex.json', 'utf-8')
    const pokemonsDatas = JSON.parse(data)

    let pokemonDatas = pokemonsDatas.filter(pokemon => (pokemon.name.french.toString().toLowerCase() === req.params.pokemonName.toString().toLowerCase()
        || pokemon.name.english.toString().toLowerCase() === req.params.pokemonName.toString().toLowerCase()))

    res.json(pokemonDatas)
})

app.get('/pokemons', (req, res) => {
    const data = fs.readFileSync('./data/pokedex.json', 'utf-8')
    const pokemonsDatas = JSON.parse(data)

    res.json(pokemonsDatas)
})