import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Acces non autorisé" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token invalide" });
  }
};

export default authMiddleware;
