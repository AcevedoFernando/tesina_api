const mongoose = require('mongoose')

const caseSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Case', caseSchema)