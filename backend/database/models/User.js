import mongoose from "mongoose";
import { hasher, compareHash } from "../Crypto";

export default class User {
    constructor(uri, salt) {
        this.uri = uri
        this.salt = salt
    }

    async connect() {
        await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        this.userSchema = new mongoose.Schema({
            username: String,
            password: String,
            email: String,
            role: String,
            capturedPokemons: Array
        })
    }

    async createUser(user) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            let usersEmail = []
            await Users.find().then(users => users.forEach(user => usersEmail.push(user.email)))
            if (usersEmail.includes(user.email)) {
                reject({ error: "This email is already taken" })
            } else {
                let hashedPassword = await hasher(user.password)
                const newUser = new Users({
                    username: user.username,
                    password: hashedPassword,
                    email: user.email,
                    role: 'user',
                    capturedPokemons: []
                })
                try {
                    await newUser.save()
                    resolve({ success: `User ${user.username} created` })
                } catch (err) {
                    reject(err)
                }
            }
        })
    }

    async login(userInfos) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({ email: userInfos.email })
                const resultHash = await compareHash(userInfos.password.toString(), user.password)
                resultHash === true ?
                    resolve({
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        id: user._id.toString(),
                        capturedPokemons: user.capturedPokemons
                    }) :
                    reject({ error: "Wrong password" })
            } catch (err) {
                reject(err)
            }
        })
    }

    async getUserById(userId) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findById(userId)
                resolve({
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    id: user._id.toString(),
                    capturedPokemons: user.capturedPokemons
                })
            } catch (err) {
                reject({ error: "Invalid id or database connection error" })
            }
        })
    }

    async setCapturedPokemons(userId, capturedPokemons) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            try {
                await Users.findByIdAndUpdate(userId, { capturedPokemons })
                const datas = await this.getUserById(userId)
                resolve(datas)
            } catch (err) {
                reject({ error: "Invalid id or database connection error" })
            }
        })
    }

    async deleteUser(userInfos) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({ email: userInfos.email })
                const resultHash = await compareHash(userInfos.password.toString(), user.password)
                if (resultHash === true) {
                    const datas = await Users.deleteOne({ email: userInfos.email })
                    resolve(datas)
                } else reject({ error: 'Wrong password' })
            } catch (err) {
                console.log(err)
                reject({ error: "Invalid email or database connection error" })
            }
        })
    }
}