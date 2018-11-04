const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user_id:{
    type: String,
    required: true
  }, 
  token: {
    type: String,
    required: true,
    unique: true
  }
});

var Session = mongoose.model("Session", SessionSchema)

module.exports = Session;