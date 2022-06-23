import '../src/db/mongoose.js';
import Task from '../src/models/task.js';


// Task.findByIdAndRemove('62b42e940d3cc67a062c9f3b').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false});
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

const removeTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id);
    const count = await Task.countDocuments({completed: false});
    return count
};

removeTaskAndCount('62b455f7c58cf0a6c0bdd492').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})