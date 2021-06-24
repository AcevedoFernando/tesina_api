const mongoose = require('mongoose')

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connection database successfully")
    } catch (err) {
        console.log("Error in databse connection")
        console.log(err)
        process.exit(1)
    }
}

module.exports = databaseConnection

