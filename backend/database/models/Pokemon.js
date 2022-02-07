import mongoose from "mongoose";

export default class Pokemon {
    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        this.pokemonSchema = new mongoose.Schema({
            id: Number,
            name: Object,
            type: Array,
            base: Object,
            species: String,
            description: String,
            evolution: Object,
            profile: Object,
            image: Object,
            sprite: String,
            thumbnail: String,
            hires: String
        })
    }

    async getAllPokemons() {
        const Pokemons = mongoose.model('pokemons', this.pokemonSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const datas = await Pokemons.find().sort({ id: 1 })
                resolve(datas)
            } catch (err) {
                reject({ error: "Database connection error" })
            }
        })
    }

    async getPokemonById(pokemonId) {
        const Pokemons = mongoose.model('pokemons', this.pokemonSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const datas = await Pokemons.find({ id: parseInt(pokemonId) })
                resolve(datas)
            } catch (err) {
                console.log(err)
                reject({ error: "Database connection error" })
            }
        })
    }

    async getPokemonsById(ids) {
        const Pokemons = mongoose.model('pokemons', this.pokemonSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const datas = await Pokemons.find({ id: { $in: ids } })
                resolve(datas)
            } catch (err) {
                reject({ error: "Database connection error" })
            }
        })
    }
}