import express, { json } from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

// app.use((request, response, next) => {
//     if(request.method === 'GET'){
//         return response.send('No getish');
//     }
//     next();
// });

// app.use((request, response, next) => {
//     response.status(503).send('The site is under maintenance');
// });

app.use(json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is upp on port', port);
});

// import Task from './models/task.js';
// import User from './models/user.js';

// const main = async () =>  {
//     // const task = await Task.findById('62bac941f7588202536868a5');
//     // await task.populate('owner')
//     // console.log(task.owner);

//     const user = await User.findById('62bac53596070a7d20e88b45');
//     await user.populate('tasks')
//     console.log(user.tasks);
// }

// main()