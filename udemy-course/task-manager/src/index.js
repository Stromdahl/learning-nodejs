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

app.use((request, response, next) => {
    response.status(503).send('The site is under maintenance');
});

app.use(json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is upp on port', port);
});

import jsonwebtoken from 'jsonwebtoken';

const myFunction = async () => {
    const token = jsonwebtoken.sign({_id: 'abc123'}, 'hamburgers');

    console.log(token);
}

myFunction()