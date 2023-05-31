const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

const startServer = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

// from package.json

// with nodemon
// "start": "cross-env NODE_ENV=production node ./server.js",
// "start:dev": "cross-env NODE_ENV=development nodemon ./server.js",

// without
// "start": "node ./server.js",
//  "dev": "node --watch ./server.js",
