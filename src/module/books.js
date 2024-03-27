import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: Number, required: true },
    quantity: { type: Number, default: 0 }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

export const BookModule = mongoose.model('book', BookSchema);