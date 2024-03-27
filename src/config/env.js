import { configDotenv } from "dotenv"
configDotenv();

const {
    DATABASE_URL: databaseUlr,
    BCRYPT_SALT: salt,
    JWT_SECRET: secret,
    EXPRESS_PORT: port
} = process.env

export { databaseUlr, salt, secret, port }