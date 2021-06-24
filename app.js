require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const databseConnection = require('./config/db')
const bodyParser = require('body-parser')
const router = require('./router/router')
require ('app-module-path/register')

//Enable Parser
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true}));
app.use(bodyParser.json({limit: '200mb'}));


app.use((req, res, next) => {
    // console.log(process.env.APP_ENV)
    // if (process.env.APP_ENV === 'production') {
    //     res.header("Origin, X-Requested-With, Content-Type, Accept");
    // } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "*");
    //}
    next();
});
    

//Enable Router
app.use('/api/v1', router)

//Database connection
databseConnection()

app.listen(port, (err) => {
    if (err) {
        console.log("Error al iniciar el servidor")
        return;
    }

    console.log(`Servidor en el puerto ${port}`)
})