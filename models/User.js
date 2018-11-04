const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model("User", UserSchema);

module.exports = User;