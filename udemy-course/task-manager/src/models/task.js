import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'A description must be provided!'],
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

taskSchema.pre('save', async function (next) {
    next();
})

const Task = mongoose.model('Task', taskSchema);

export default Task;