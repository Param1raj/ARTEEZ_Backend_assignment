import jwt from "jsonwebtoken";
import { LibrarianModule } from "../module/librarians.js";
import { UserModule } from "../module/user.js";
import { validationResult } from "express-validator";
const secret = process.env.JWT_SECRET;
export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export async function librarianAutherization(req, res, next) {
    const token = req.headers.autherization.split(' ')[1];
    if (token) {
        const decode = jwt.verify(token, secret);
        if (typeof decode !== 'string') {
            const { role, email } = decode;
            // if (role === 'librarian') {
            const librarian = await LibrarianModule.findOne({ email }).exec();
            if (librarian) {
                next();
            } else {
                res.status(401).send({ message: 'You are not autherized for this operation.' })
            }
            // } else {
            res.status(401).send({ message: 'You are not autherized for this operation.' })
            // }
        } else {
            console.log('failed decoding of token')
        }
    } else {
        res.status(401).send({ message: "not autherized" })
    }
}

export async function UserAutherization(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token, 'token');
    if (token) {
        const decode = jwt.verify(token, secret);
        if (typeof decode !== 'string') {
            const { email } = decode;
            const user = await UserModule.findOne({ email }).exec();
            if (user) {
                next();
            } else {
                res.status(401).send({ message: 'You are not autherized for this operation.' })
            }
            // res.status(401).send({ message: 'You are not autherized for this operation.' })
        } else {
            console.log('failed decoding of token')
        }
    } else {
        res.status(401).send({ message: "not autherized" })
    }
}