import express from "express";
import Schema from "./Database/schema.js";
const app = express();
const router = express.Router();

// signup router is here

router.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;
  console.log(req.body);

  try {
    
    const options = {
      expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    const user = await Schema.create({
      name,
      phone,
      email,
      password,
    });
    const token = user.createToken();
    console.log(token);
    res.status(201).cookie("token", token, options).json({
      success: true,
      messege: "Registerd Successfully!",
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

// signin router is here
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await Schema.findOne(req.email);
    if (!user) {
      res.status(402).json({ message: "Incorrect Password or email!" });
    }
    if (password === !user.password) {
      res.status(402).json({ message: "Incorrect Password or email!" });
    }

    const token = user.createToken();
    const options = {
      expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      messege: "Login Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully!",
    });
});

export default router;
