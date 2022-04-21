"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const Books = require('../Models/BookModel');

router.post('/create', checkAuth, (req, res) => {
    var newbook = new Books({
        BookID: req.body.BookID,
        Title: req.body.Title,
        Author: req.body.Author
    });

    Books.findOne({ BookID: req.body.BookID }, (error, book) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        if (book) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Book ID already exists");
        }
        else {
            newbook.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
            });
        }
    });
});

router.post('/delete', checkAuth, (req, res) => {
    Books.deleteOne({ BookID: req.body.BookID }, (error, result) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        if (result.n == 0) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Book ID does not exists");
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
    });
});

router.get('/home', checkAuth, (req, res) => {
    Books.find({}, (error, result) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;