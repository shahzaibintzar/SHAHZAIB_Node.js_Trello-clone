const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// create 
const main = express();

// cors
main.use(cookieParser());
main.use(cors());
main.use(express.json());

// routes

const authRoutes = require("./routes/userAuth");

main.use("/auth", authRoutes);

mongoose.connect(process.env.DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Mongodb error : ", error);
});

db.once("open", () => {
  console.log("Mongodb connected sucessfully!");
  const port = process.env.PORT;
  main.listen(port, () => {
    console.log(`server is running on ${port} port`);
  });
});