import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import User from '../models/user.js';


const router = new express.Router();



router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        response.status(201).send({ user, token });
    } catch (error) {
        response.status(400).send(error);
    }
});

router.post('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({ user, token });
    } catch (error) {
        console.log(error);
        response.status(400).send()
    }
});


router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => token.token !== request.token);
        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = [];
        await request.user.save()

        response.send();
    } catch (error) {
        response.status(500).send();
    }
})

router.get('/users/me', auth, async (request, response) => {
    response.send(request.user);
});

router.patch('/users/me', auth, async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return response.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const user = request.user

        updates.forEach((update) => user[update] = request.body[update]);
        user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/users/me', auth, async (request, response) => {
    try {
        await request.user.remove()
        response.send(request.user);
    } catch (error) {
        response.status(500).send(error);
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a Image"));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (request, response) => {
    request.user.avatar = request.file.buffer;
    await request.user.save();
    response.send();
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (request, response) => {
    request.user.avatar = undefined;
    await request.user.save();
    response.send();
});

router.get('/users/:id/avatar', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)

        if(!user || !user.avatar) {
            throw new Error();
        }

        response.set('Content-Type', 'image/jpg');
        response.send(user.avatar)
    } catch (error) {
        response.status(404).send()
    }
});

export default router;