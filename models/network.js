const mongoose = require('mongoose')
const networkSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userDesc:{
        type: String,
        required: true
    },
    userOrgs:{
        type: String,
        required: true
    },
    userNos:{
        type: String,
        required: true
    },
    userChannel:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Network', networkSchema)