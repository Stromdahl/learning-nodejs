const auth = (request, response, next) => {
    console.log("auth middleware");
    next();
}

export default auth