const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const {runQuery, addEmail} = require('./app')


const app = express()

//this serves public folder to the path we have set
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/data', async (req, res) => {
    const data = await runQuery()

    console.log(data)

    res.send({
        data: data[0].total
    })
})

app.post('/register', async (req, res) => {
   addEmail(req.body.email)

   console.log(req.body)
   res.send("POST request to the homepage")
})


//listen to the port to make server listen to this port
app.listen(3002, ()=>{
    console.log('listening on port 3002')
})