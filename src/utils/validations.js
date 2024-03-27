import { check } from "express-validator"

export const RegisterValidations = [
    check('username').exists()
        .withMessage('username is required'),
    check('email').exists()
        .withMessage('email is required').isEmail().withMessage('email not valid'),
    check('password').exists()
        .withMessage('password is required')
]
export const LoginValidations = [
    check('email').exists()
        .withMessage('email is required').isEmail().withMessage('email not valid'),
    check('password').exists()
        .withMessage('password is required')
]

export const BookCreateValidations = [
    check('title').exists().withMessage('title is required'),
    check('author').exists().withMessage('author is required'),
    check('ISBN').exists().withMessage('ISBN is required'),
]
