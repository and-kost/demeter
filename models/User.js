const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    candidates: [{
        type: Types.ObjectId,
        ref: 'Candidate'
    }]
})

module.exports = model('User', schema)