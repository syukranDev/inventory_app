const express = require('express')
const app = express();
const cors = require('cors');
const PORT = 3003

const bodyParser = require('body-parser')

const inventoryRouter = require('./router/inventoryRouter')
app.use(cors());
app.use(bodyParser.json({ limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '1mb', extended : true}))
app.use (function (err, req, res, next){
    if (err) res.status(400).json({ message: 'Invalid JSON'});
    else next();
});

app.use('/api/inventory', inventoryRouter)

app.listen(PORT, () => {
    console.log(`Connected to my server at port ${PORT}`)
})