import '../src/db/mongoose.js';
import User from '../src/models/user.js';

// 62b42f7564c235a4214f4d38

// User.findByIdAndUpdate('62b42f7564c235a4214f4d38', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1});
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('62b43825f6c791d9fca33dcc', 2).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})