const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({

    source: {
        type: String,
        required: false
    },
    destination: {
        type: String,
        required:true
    },
    departure: {
        type: String,
        required:false
    },
    price: {
        type: String,
        required:true,
    },
    desc: {
        type: String,
        required:false,
    },
    checkIn: {
        type: String,
        required:false,
    },
    checkOut: {
        type: String,
        required:false,
    },
    packageType: {
        type: String,
        required:true,
    },
    imagePath: {
        type: String,
        required:false,
    }
 
}, { timestamps: true })

const Package = mongoose.model('package', packageSchema)
module.exports = Package