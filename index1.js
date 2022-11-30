
const express = require('express');
const bodyParser = require('body-parser')
const dns = require('dns')
const emailValidator = require('deep-email-validator');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.send("Hi welcome")
})



const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/



function validateEmail(email) {
    return emailRegex.test(email)
}

function pickDomain(email) {
    const domain = email.split("@")
    return domain[1]
}

function findMxRecord(domain) {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err,address) => {
            try {
                const min = address.reduce((a,b) => {
                    if(a.priority < b.priority) {
                        return a
                    }
                    return b
                },{})
                return resolve(min)    
            }
            
            catch (err) {
                return reject({err, message:"domain not found"})
            }
        })
    })
}

app.post("/clean-email", async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailValidateStatus = await validateEmail(email)
        if (emailValidateStatus) {
            const domain = await pickDomain(email)
            const address = await findMxRecord(domain)
            console.log(address)
        }
        console.log(emailValidateStatus)
        res.send({message: "email cleaned", status: emailValidateStatus})
    }
    catch(err) {
        res.send(err)
    }
})

app.listen(3000, ()=> {
    console.log('port is running on port 3000')
})


app.listen(3000, ()=> {
    console.log('port is running on port 3000')
})









