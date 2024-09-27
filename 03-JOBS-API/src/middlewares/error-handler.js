import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const msg =
    err.message || "Une erreur s'est produite, veuillez réessayer plus tard";
  const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (err.code === 11000) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "L'adresse mail existe deja" });
  }

  res.status(statusCode).json({ msg });
};

export default errorHandler;
