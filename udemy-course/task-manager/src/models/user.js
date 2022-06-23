import mongoose from "mongoose";
import validator from 'validator'

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [7, 'password lenght must be greater than 6 characters'],
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error("The password can`t contain 'password'");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a posetive number')
            }
        }
    }
});

export default User;