const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys/index')

const app = express()

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}...`)
        })

    } catch (e) {
        console.log(e)
    }
}

start()