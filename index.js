const express = require('express')
require('./db/config')
const user = require('./db/user')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/singup' , async (req,resp) => {
    const data = new user(req.body);
    const result = await data.save();
    result = result.toObject()
    delete result.password
    resp.send(result);
})

app.post('/login', async (req,resp) => {
    if(req.body.email && req.body.password){
        let data = await user.findOne(req.body).select('-password')
        if(data){
            resp.send(data)
        }else{
            resp.send({result: 'No user found'})
        }
    }else {
        resp.send({result: 'No user found'})
    }
})

app.listen(5000);