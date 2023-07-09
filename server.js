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
    origin:"https://client-umber-iota.vercel.app",
      credentials: true,
  })
);

// body_parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: "application/*+json," * "" }));
app.use(express.json());
// use router
app.use(router);
// db connection
conn();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
});
