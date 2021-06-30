const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const DB_URL = 'This you need to add your MongoDB credential for the database.'

const app = express()
app.use(express.json())
const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('The Server works fine at PORT = .' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()