import { Router } from "express";
import { UserAutherization } from "../utils/utils.js";
import { BookModule } from "../module/books.js";
import { BorrowedBookModule } from "../module/borrowed.js";

const BorrowedBookRouter = Router();
// Borrow a book
BorrowedBookRouter.post('/:bookId/:userId', UserAutherization, async (req, res) => {
    try {
        const { bookId, userId } = req.params;
        const { quantity } = await BookModule.findOne({ _id: bookId }).exec();
        console.log(quantity, "quantity received!")
        // check if a book is already borrowed by this student.
        const alreadyExist = await BorrowedBookModule.findOne({ bookId, userId }).exec();
        if (alreadyExist) {
            res.status(400).send({ message: "Book is already borrowed by student" })
            return;
        }
        await BorrowedBookModule.create({ bookId, userId });
        const bookUpdated = await BookModule.findByIdAndUpdate(bookId, { quantity: quantity - 1 }, { new: true }).exec();
        res.send({ message: "Book borrowed Successfully", data: { bookUpdated } })
    } catch (error) {
        res.status(401).send({ message: 'failed to borrow book', data: { error } })
    }
})

export default BorrowedBookRouter;