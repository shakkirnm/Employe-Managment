const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    empName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    dateOfJoin : {
        type : Date,
        required : true
    },
    password : {
        type : String,
        required : true,
        min : 4,
    },
    isSuperUser : {
        type : Boolean,
        default : false
    }

})

module.exports = mongoose.model("User", UserSchema)