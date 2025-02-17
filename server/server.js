import express from "express";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import fs from "fs";
import User from "./models/UserMode.js";
import asyncHandler from "express-async-handler";
dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// function to check if user exists in the db
const ensureUserInDB = asyncHandler(async (user) => {
  const existingUser = await User.findOne({ auth0Id: user.sub });
  if (!existingUser) {
    // create a new user document
    const newUser = new User({
      auth0Id: user.sub,
      email: user.email,
      name: user.name,
      role: "visitor",
      profilePicture: user.picture,
    });
    await newUser.save();
  }
});

//routes
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
  import(`./routes/${file}`)
    .then((route) => {
      app.use("/api/v1/", route.default);
    })
    .catch((error) => {
      console.log("Error importing route", error);
    });
});

const server = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`server is listening to ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

server();
