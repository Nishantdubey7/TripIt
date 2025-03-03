const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required: true
    }    
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User