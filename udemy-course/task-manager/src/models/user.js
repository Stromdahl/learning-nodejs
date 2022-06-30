import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import validator from 'validator'
import Task from './task.js';


const userSchema = mongoose.Schema({
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
            if (value.toLowerCase().includes('password')) {
                throw new Error("The password can`t contain 'password'");
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a posetive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
    const token = jsonwebtoken.sign({ _id: this._id.toString() }, 'hamburgers');

    this.tokens = this.tokens.concat( {token});
    await this.save()

    return token;
};

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    
    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

//Find User by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    const errorMessage = 'Unable to login'
    if (!user){
        throw new Error(errorMessage);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error(errorMessage);
    }

    return user;
};

//Hash password
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

// Delete user taskts when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema);

export default User;