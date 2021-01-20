const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique:true
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
    linked_games:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games',
    },
    is_active :{
        type: Boolean,
        default: true,
    },
    is_admin :{
        type: Boolean,
        default: false,
    },
    date: {
      type: Date,
      default: Date.now
    }
}, { autoCreate : true })

module.exports = mongoose.model('user', UserSchema);
