const express = require('express');
const app = express();
const PORT = 3000;

const morgan = require('morgan')




app.use(morgan('tiny'));







app.listen(PORT, ()=> {
    console.log(`Server listening on https://localhost:${PORT}`)
})

