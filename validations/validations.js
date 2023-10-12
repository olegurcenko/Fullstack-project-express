import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'Not correct email').isEmail(),
    body('password', 'Not correct password').isLength({ min: 5 }),
    body('fullName', 'Not correct fullName').isLength({ min: 3 }),
    body('avatarUrl', 'Not correct avatarUrl').optional().isURL(),
]

export const loginValidator = [
    body('email', 'Not correct email').isEmail(),
    body('password', 'Not correct password').isLength({ min: 5 }),
]

export const postCreateValidator = [
    body('title', 'Not correct title').isLength({min: 3}).isString(),
    body('text', 'Not correct text').isLength({ min: 10 }).isString(),
    body('tags', 'Not correct tags, (try array)').optional().isString(),
    body('imageUrl', 'Not correct imageUrl').optional().isString(),
]