import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jsonwebtoken.verify( token , 'hamburgers' );
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user) {
            throw new Error();
        }

        request.token = token;
        request.user = user;

        next()
    } catch (error) {
        response.status(401).send({error: 'Please authenticate'});
    }
}

export default auth