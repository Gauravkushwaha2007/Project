const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3,'Name must greater than 3 words'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  // This is for live Tracking
  socketId: {
    type: String,
  },

});

// Token Genrate 
userSchema.methods.generateToken = function () {
    const token =  jwt.sign(
        {_id: this._id, email: this.email},
        process.env.JWT_SECRET,
        {expiresIn : '4d'}
    );
    return token
}

// Comparing Password 
userSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass, this.password);
    return isMatch;
}

// Hashing password
userSchema.methods.hashPassword = async function(pass){
    return await bcrypt.hashPassword(pass, 10);
}

const User = mongoose.model( 'User', userSchema);
module.exports = User;