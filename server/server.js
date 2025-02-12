import express from "express";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
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

// app.get("/random", (req, res) => {
//   res.json({ random: Math.random() });
// });

app.listen(process.env.PORT, () => {
  console.log(`server is listening to ${process.env.PORT}`);
});
