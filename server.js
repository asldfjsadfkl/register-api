import express from "express";
import router from "./route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { conn } from "./Database/Db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "https://client-umber-iota.vercel.app",
    credentials: true,
  })
);
// body_parsersss
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json," * "" }));
app.use(express.json());
// db connection
conn();
// use router
app.use(router);

// db connection
conn();
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(PORT);
});
