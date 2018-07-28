var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema ({
    user: String,
    passwprd: String
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User" , UserSchema)