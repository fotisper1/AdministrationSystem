import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
export const authorizationRequest = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken)
      return res.status(401).json({ error: "User not Authenticated!" });
  
    try {
      const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (validToken) {
        next()
      }
      
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
};