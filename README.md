# Introduction

> g a backend system for a library. The system should allow users to perform operations such as adding books, searching for books, borrowing and returning books and managing user accounts.

[![npm](https://img.shields.io/npm/v/prebuild.svg)](https://www.npmjs.com/)
![Node version](https://img.shields.io/node/v/prebuild.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## How to Setup?

### First clone the repo

```
$ git clone git@github.com:Param1raj/ARTEEZ_Backend_assignment.git
```

Move to the root directory.

```
$ cd ARTEEZ_Backend_assignment
```

### Install all the depandencies

```
$ npm install
```

### SetUp .env

create a .env file, copy .env.example and paste in .env file. Provide appropriate value, provided to you.

### Run application

```
$ npm start
```

Now server will be running http://localhost:4000/

## What routes can be accessed?

```
METHOD      ROUTE                               OPERATION                                   INPUT

POST        /api/books                          To create a book.                           title, author, ISBN, quantity
GET         /api/books                          To fetch all the available books.           none
GET         /api/books/:bookId                  To fetch a specific book by id.             none
POST        /api/users                          To register a user.                         username, password, email
POST        /api/users/login                    To login a user.                            email,password
POST        /api/borrow/:bookId/:userId         To borrow a book.                           bookId, userId in api endpoint as a parameter
POST        /api/return/:bookId/:userId         To return a borrowed book.                  bookId, userId in api endpoint as a parameter
GET         /api/users/:userId/books            To fetch all the borrowed books of a user   userId in api endpoint as a parameter
```
## How to test the application?
Open Thunderclient in vscode or Postman
In url input, put root url http://localhost:400/[api route you want to access] like api/books;

Some of the apis requires authorization:
- /api/borrow/:bookId/:userId
- /api/return/:bookId/:userId

To access these apis you need to provide authorization token in header
go to the header section and set Authorization option and set it to bearer [your token value] what you recieve after login.

