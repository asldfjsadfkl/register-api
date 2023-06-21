import express from "express";
import router from "./route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { conn } from "./Database/Db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(
  cors({
     origin: ["https://registratin-i2td.vercel.app", "https://register-api-nine.vercel.app"],
      methods: "POST,GET,PUT",
      credentials: true,
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://registratin-i2td.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// body_parser
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/*+json," * "" }));
app.use(express.json());
// use router
app.use(router);
// db connection
conn();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(PORT);
});
