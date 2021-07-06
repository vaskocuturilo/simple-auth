const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRoutes.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 5000
const DB_URL = ''

const app = express()
app.use(express.json())
app.use('/auth', authRouter)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startApplication() {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true}, {useUnifiedTopology: true}, {useFindAndModify: false})
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApplication()