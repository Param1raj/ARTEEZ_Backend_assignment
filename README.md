# Library Management System Backend

Welcome to the Library Management System Backend! This system facilitates various operations such as adding books, searching, borrowing, returning books, and managing user accounts.

[![npm](https://img.shields.io/npm/v/prebuild.svg)](https://www.npmjs.com/)
![Node version](https://img.shields.io/node/v/prebuild.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Setup Instructions

### Clone the Repository

```bash
$ git clone git@github.com:Param1raj/ARTEEZ_Backend_assignment.git
```

Navigate to the root directory:

```bash
$ cd ARTEEZ_Backend_assignment
```

### Install Dependencies

```bash
$ npm install
```

### Set Up Environment Variables

Create a `.env` file by copying `.env.example` and providing appropriate values as instructed.

### Run the Application

```bash
$ npm start
```

The server will be accessible at http://localhost:4000/

## Available Routes

| Method | Route                              | Operation                            | Input                           |
|--------|------------------------------------|--------------------------------------|---------------------------------|
| POST   | /api/books                         | Create a book                        | title, author, ISBN, quantity  |
| GET    | /api/books                         | Fetch all available books            | none                            |
| GET    | /api/books/:bookId                 | Fetch a specific book by id          | none                            |
| POST   | /api/users                         | Register a user                      | username, password, email      |
| POST   | /api/users/login                   | Login a user                         | email, password                |
| POST   | /api/borrow/:bookId/:userId        | Borrow a book                        | bookId, userId (as parameters) |
| POST   | /api/return/:bookId/:userId        | Return a borrowed book               | bookId, userId (as parameters) |
| GET    | /api/users/:userId/books           | Fetch all borrowed books of a user   | userId (as parameter)          |

## Testing the Application

You can test the application using Thunderclient in VSCode or Postman. Use the root URL http://localhost:4000/[api route] for accessing different routes.

For APIs requiring authorization (e.g., /api/borrow/:bookId/:userId, /api/return/:bookId/:userId), provide an authorization token in the header. Set the 'Authorization' option to 'Bearer [your token value]' obtained after login.
