
const express = require('express');
const bodyParser = require('body-parser')
const dns = require('dns')
const emailValidator = require('deep-email-validator');
var http = require('http');
var url = require('url');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



async function isEmailValid(email) {
    return emailValidator.validate(email)
}

// localhost:3000/email?email=michael.ly2002@gmail.com

app.get("/email", async (req, res, next) => {
    try {
        const email = req.query.email;
        // console.log(email)
        // const { email } = req.body;
        let a = await isEmailValid(email)
        res.send(a)
    }
    catch(err) {
        res.send(err)
    }
})

app.listen(3000, ()=> {
    console.log('running')
})
