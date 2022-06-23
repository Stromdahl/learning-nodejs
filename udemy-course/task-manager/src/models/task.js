import mongoose from "mongoose";

const Task = mongoose.model('Task', {
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
});

export default Task;