import express from "express";
import cors from 'cors';
import { connection } from "./config/db.js";
import BookRouter from "./routes/books.route.js";
import UserRouter from "./routes/user.route.js";
import BorrowedBookRouter from "./routes/borrow.route.js";
import ReturnBookRouter from "./routes/return.route.js";
import { port } from "./config/env.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ideally it should allow only some of its known origins.
app.use(cors({
    origin(origin, callback) {
        // set of allowed origin.
        const allowedOrigin = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000']
        if (!origin || allowedOrigin.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Content-Type',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Authorization',
    ],
}))

app.use('/api/books', BookRouter)
app.use('/api/users', UserRouter)
app.use('/api/borrow', BorrowedBookRouter)
app.use('/api/return', ReturnBookRouter)

app.listen(port, async () => {
    try {
        await connection
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log(error, "error while starting the server!")
    }
})

process.on('unhandledRejection', (reason, _p) => {
    console.log(reason);
})