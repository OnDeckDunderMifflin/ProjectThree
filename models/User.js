const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    lowerCase: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    }, 
    createdDecks: [{
        type: Schema.Types.ObjectId, 
        ref: 'Deck'
    }]
});


var User = mongoose.model("User", UserSchema);

module.exports = User;