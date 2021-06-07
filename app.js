const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))


const PORT = config.get('port') || 5000

async function start() {
    try{
        let uri = config.get('mongoUri')
        let dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        await mongoose.connect(uri, dbOptions)

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error.message}`)
        process.exit(1)
    }
}

start()