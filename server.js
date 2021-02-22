const express = require('express');
const app = express();
const PORT = 3000;

const morgan = require('morgan');
const bodyParser = require('body-parser')



app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())







app.listen(PORT, ()=> {
    console.log(`Server listening on https://localhost:${PORT}`)
})

