import jwt  from "jsonwebtoken";
const jwtMiddleware = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json("Vous n'êtes pas connecté");
    }
    try{
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY); 
        console.log("token clear",verifiedToken); 
        req.user=verifiedToken;
        next();  
    }
    catch(error){
        return res.status(401).json("Token non valide");
    }
}

export default jwtMiddleware; 