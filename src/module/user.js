import mongoose from "mongoose";
import validator from 'validator';

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String, unique: true, validate: [validator.isEmail, 'invalid email'],
        required: true
    },
    password: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

export const UserModule = mongoose.model('user', UserSchema);