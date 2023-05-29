const handleMongooseError = (error, _, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  error.status = 400;
  next();
};

module.exports = handleMongooseError;
