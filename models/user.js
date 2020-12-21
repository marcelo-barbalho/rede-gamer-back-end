const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    birthdate : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        select: false
    },
    is_active :{
        type: Boolean,
        default: true,
    },
    is_admin :{
        type: Boolean,
        default: true,
    },
    date: {
      type: Date,
      default: Date.now
    }
}, { autoCreate : true })

module.exports = mongoose.model('user', UserSchema);
