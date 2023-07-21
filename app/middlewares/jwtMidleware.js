import jwt  from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Split to get the token value without the prefix 'Bearer'

    if (!token) {
        return res.status(401).json("Vous n'êtes pas connecté");
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verifiedToken;
        next();
    } catch(error) {
        return res.status(401).json("Token non valide");
    }

}

export default jwtMiddleware;