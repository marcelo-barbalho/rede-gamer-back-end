const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
    photo: {
        type : String
    },
    title: {
        type : String,
        required : true,
        unique:true
    },
    category:  {
        type: String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    complete_description: {
        type : String,
        required:true
    },
    most_played: {
        type : Boolean,
        default: false
    },
    game_proficiency: {
        type : Number,
        min: 0,
        max: 10,
        required:true
    },
    learning: {
        type : Boolean,
        default: false
    },
    teaching: {
        type : Boolean,
        default: false
    },
    open_random_party: {
        type : Boolean,
        default: false  
    },
    last_modification_date: {
        type: Date,
        default: Date.now
    }
}, { autoCreate : true })

module.exports = mongoose.model('game', GamesSchema);
