import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
    // Split to get the token value without the prefix 'Bearer'
    const token = req.cookies.jobmemo_token;

    if (!token)
      return res.status(401).json("Aucun token trouvé");

    try {
      const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verifiedToken;
      next();
    } catch(error) {
        return res.status(403).json("Token invalide");
    }

}

export default jwtMiddleware;