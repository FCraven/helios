if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const morgan = require('morgan');
const bodyParser = require('body-parser')


//middleware
//static server
app.use(express.static('public'))
//logging
app.use(morgan('tiny'));
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, ()=> {
    console.log(`Server listening on https://localhost:${PORT}`)
})

