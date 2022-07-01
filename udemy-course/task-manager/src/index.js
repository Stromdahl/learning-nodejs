import express, { json } from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

import multer from 'multer';
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error("Please upload a Word document"));
        }
        cb(undefined, true);
    }
});

app.post('/upload',upload.single('upload'), (request, response) => {
    response.send();
});



app.use(json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is upp on port', port);
});