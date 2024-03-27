import mongoose from "mongoose";
import { databaseUlr } from "./env.js";

export const connection = mongoose.connect(databaseUlr).then(() => console.log('Database Connection successfull!'));