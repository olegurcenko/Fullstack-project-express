import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { registerValidator, loginValidator, postCreateValidator } from './validations/validations.js'
import { UserController, PostController } from './controllers/index.js'
import { handleErrors, checkAuth } from './utils/index.js'


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

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage })

app.use(express.json())

app.use(cors())

app.use('/uploads', express.static('uploads'))

//! User

app.post('/auth/login', loginValidator, handleErrors, UserController.login)

app.post('/auth/register', registerValidator, handleErrors, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)
//! Post

app.get('/posts', PostController.getAll)

app.get('/tags', PostController.getLastTags)

app.get('/posts/:id', PostController.getOne)

app.delete('/posts/:id', checkAuth, PostController.remove)

app.post('/posts', checkAuth, postCreateValidator, handleErrors, PostController.create)

app.patch('/posts/:id', checkAuth, postCreateValidator, handleErrors, PostController.update)

//! upload

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})