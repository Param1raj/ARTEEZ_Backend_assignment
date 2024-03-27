import express from "express";
import bcrypt from 'bcryptjs'
import { UserModule } from "../module/user.js";
import jwt from "jsonwebtoken";
import { handleValidationErrors } from "../utils/utils.js";
import { LoginValidations, RegisterValidations } from "../utils/validations.js";
import { BookModule } from "../module/books.js";
import { BorrowedBookModule } from "../module/borrowed.js";
import { salt, secret } from "../config/env.js";

const UserRouter = express.Router();
// fetch all the books a perticular user.
UserRouter.get('/:userId/books', async (req, res) => {
    try {
        const { userId } = req.params;
        const bookIds = await BorrowedBookModule.find({ userId, returned: false }).exec();
        console.log(bookIds, "all the books we get from the backend database")
        const books = await BookModule.find({ _id: { $in: bookIds.map((book) => book.bookId) } }).exec();
        res.send({ message: "OK", data: { books } })
    } catch (error) {
        console.log(error, 'error in fetching books');
        res.status(401).send({ message: "Failed to fetch books" })
    }
})

// Register a user, email should be unique.
UserRouter.post('/',
    RegisterValidations,
    handleValidationErrors
    , async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, Number(salt) ?? 4);
            await UserModule.create({ username, email, password: hashedPassword });
            res.status(200).send({ message: 'Registration Successful', data: { username, email } })
        } catch (error) {
            console.log(error, 'error in registering user');
            res.status(401).send({ message: "Email already exist, try login", data: { error } })
        }
    })

// Login as a user
UserRouter.post('/login', LoginValidations, handleValidationErrors, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModule.findOne({ email }).exec();
        console.log("User found by query", user);
        let passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            const token = jwt.sign({ email }, secret)
            if (token) {
                res.status(200).send({ message: 'Login Successful', data: { token } })
            } else {
                res.status(401).send({ message: 'something went wrong!' })
            }
        } else {
            res.status(401).send({ message: "Incorrect password" })
        }
    } catch (error) {
        console.log(error, 'error in login user');
        res.status(401).send({ message: "Failed to register user" })
    }
})

export default UserRouter;