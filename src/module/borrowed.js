import mongoose from "mongoose";

const BorrowedBookSchema = mongoose.Schema({
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
    returned: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

export const BorrowedBookModule = mongoose.model('borrowedBook', BorrowedBookSchema);