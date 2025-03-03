const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required:true
    },
 
}, { timestamps: true })

const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin