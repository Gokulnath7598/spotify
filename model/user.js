const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = schema({
    'name':{
        type: String,
        require: true
    },
    'email':{
        type: String,
        require: true,
        unique: true
    },
    'password':{
        type: String,
        require: true,
        minLength: 8
    },
});

module.exports = mongoose.model("User", userSchema);