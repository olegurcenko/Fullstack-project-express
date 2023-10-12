import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from './models/user.js'
import { registerValidator, loginValidator, postCreateValidator } from './validations/validations.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'


mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.nhqqrqt.mongodb.net/blog?retryWrites=true&w=majority',
)
.then(() => {
    console.log('db okay')
})
.catch((err) => {
    console.log('db error', err)
})

const app = express()

app.use(express.json())

//! User

app.post('/auth/login', loginValidator, UserController.login)

app.post('/auth/register', registerValidator, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

//! Post

app.get('/posts', PostController.getAll)

app.get('/posts/:id', PostController.getOne)

//app.delete('/posts', PostController.delete)

//app.patch('/posts', PostController.update)

app.post('/posts', checkAuth, postCreateValidator, PostController.create)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})