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
            role: String
        })
    }

    async createUser(user) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            let hashedPassword = await hasher(user.password)
            const newUser = new Users({
                username: user.username,
                password: hashedPassword,
                email: user.email,
                role: 'user'
            })
            try {
                await newUser.save()
                resolve({ success: `User ${user.username} created` })
            } catch (err) {
                reject(err)
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
                    resolve({ username: user.username, email: user.email, role: user.role, id: user._id.toString() }) :
                    reject({ error: "Wrong password" })
            } catch (err) {
                reject({ error: "Invalid email or database connection error" })
            }
        })
    }

    async getUserById(userId) {
        const Users = mongoose.model('users', this.userSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findById(userId)
                resolve({ username: user.username, email: user.email, role: user.role, id: user._id.toString() })
            } catch (err) {
                reject({ error: "Invalid id or database connection error" })
            }
        })
    }
}