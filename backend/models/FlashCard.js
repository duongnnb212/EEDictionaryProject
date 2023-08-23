const mongoose = require("mongoose");

const FlashCardSchema = new mongoose.Schema({
    cardName: {
        type:String,
        required:true,
    },
    definition:{
        type: String,
        required:true,
    }
})

module.exports = mongoose.model('FlashCard',FlashCardSchema);