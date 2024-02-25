const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './config/.env' }); 
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,'first name is required'],
        maxlength: 32
    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'last name is required'],
        maxlength: 32
    },
    email:{
        type:String,
        trim:true,
        required:[true,'email is required'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password:{
        type:String,
        trim:true,
        required:[true,'password is required'],
        minlength: [6,'password must have at least (6) charcters']
    },
    imageURL:{
        type:String
    }
});

// Hash password before saving
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7 days" // You can customize the expiry
    });
};

// Method to check if password is valid
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
