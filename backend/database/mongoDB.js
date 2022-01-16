import { MongoClient } from "mongodb";

export default class MongoDB {
    constructor(uri) {
        this.uri = uri;
    }

    connect() {
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        this.db = this.client.db("projectIDW03")
    }

    async getAllPokemons() {
        return new Promise((resolve, reject) => {
            this.client.connect(async err => {
                if (err) reject(err)
                try {
                    const datas = await this.db.collection("pokemons").find({}).toArray()
                    resolve(datas)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    async getPokemonById(pokemonId) {
        return new Promise((resolve, reject) => {
            this.client.connect(async err => {
                if (err) reject(err)
                try {
                    const datas = await this.db.collection("pokemons").find({ id: parseInt(pokemonId) }).toArray()
                    resolve(datas)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}