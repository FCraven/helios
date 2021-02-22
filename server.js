const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const path = require('path')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const axios = require('axios')


//middleware
//logging
app.use(morgan('tiny'));
//static server
app.use(express.static('public'))
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())


//ROUTES

app.get('/api/weather', async (req,res)=> {
    try {
        const { lat, lon } = req.query;
        const key = process.env.DARK_SKY_API_KEY
        const queryUrl = `https://api.darksky.net/forecast/${key}/${lat},${lon}`
        const { data }= await axios.get(queryUrl)
        res.json(data)

    } catch(err) {
        console.log(err)
    }

})

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, ()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})

