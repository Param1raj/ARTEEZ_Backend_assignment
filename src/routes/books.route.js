import { Router } from "express";
import { BookModule } from "../module/books.js";
import { BookCreateValidations } from "../utils/validations.js";
import { handleValidationErrors, librarianAutherization } from "../utils/utils.js";

const BookRouter = Router();
// Fetche all the book available
BookRouter.get('/', async (req, res) => {
    try {
        const books = await BookModule.find({ quantity: { $gt: 0 } }).exec();
        console.log(books);
        res.send({ message: 'OK', data: { books } })
    } catch (error) {
        res.status(401).send({ message: 'Failed to fetch books' })
    }
})
// Fetche a specific book by id
BookRouter.get('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        const book = await BookModule.findOne({ _id }).exec();
        res.send({ message: 'OK', data: { book } })
    } catch (error) {
        res.status(401).send({ message: 'Failed to fetch book' })
    }
})

// create a book but you need be librarian to be able to add books so go and login as librarian
BookRouter.post('/',
    BookCreateValidations,
    handleValidationErrors
    // Currently this api can be called by anyone but idealy it should be accessable to librarian only using 
    // librarianAutherization middleware
    , async (req, res) => {
        try {
            const { title, author, ISBN, quantity } = req.body;
            const book = await BookModule.create({ title, author, ISBN, quantity });
            res.send({ message: 'Book Created Successfully', data: { book } });
        } catch (error) {
            res.status(401).send({ message: 'Failed to create book' })
        }
    })


export default BookRouter;