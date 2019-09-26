const mongoose = require('mongoose'); // importing mongoose

const Schema = mongoose.Schema; // importing Schema

// creating a user Schema
/**
 * creating a schema contains fields that resource will have
 *  */ 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

/** 
 * mongoose.model('user', <Schema>) :- is used for creating a model from a schema
 * */ 
module.exports = User = mongoose.model('users', UserSchema)