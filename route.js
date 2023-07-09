import express from "express";
import Schema from "./Database/schema.js";

const router = express.Router();

// signup router is here

router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    if (!name || !phone || !email || !password) {
      res.status(404).json({
        success: false,
        message: "Invalid Data!",
      });
    }
    const options = {
      expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      httpOnly: true,
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
    console.log(error);
  }
});

// signin router is here
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(402).json({ message: "Invalid Data" });
    }
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
       sameSite: "none",
    };
    res.status(201).cookie("token", token, options).json({
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
