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
    }
})

taskSchema.pre('save', async function (next) {
    next();
})

const Task = mongoose.model('Task', taskSchema);

export default Task;