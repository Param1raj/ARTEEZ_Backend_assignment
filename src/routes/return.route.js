import { Router } from "express";
import { UserAutherization } from "../utils/utils.js";
import { BookModule } from "../module/books.js";
import { BorrowedBookModule } from "../module/borrowed.js";

const ReturnBookRouter = Router();
// what if a authenticated user sends someone else id?
ReturnBookRouter.post('/:bookId/:userId', UserAutherization, async (req, res) => {
    try {
        const { bookId, userId } = req.params;
        // current quantity of the books
        const { quantity } = await BookModule.findOne({ _id: bookId }).exec();
        console.log(quantity, "quantity received!")
        // marked as returned
        let returnedBook = await BorrowedBookModule.findOneAndUpdate({ bookId, userId, returned: false }, { returned: true });
        // updated the book quantity only if there is book to be returned
        if (returnedBook) {
            const bookUpdated = await BookModule.findByIdAndUpdate(bookId, { quantity: quantity + 1 }, { new: true }).exec();
            res.send({ message: "Book returned Successfully", data: { bookUpdated } })
        } else {
            res.status(400).send({ message: 'Book is already returned' })
        }
    } catch (error) {
        res.status(401).send({ message: 'failed to borrow book', data: { error } })
    }
})

export default ReturnBookRouter;