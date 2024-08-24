import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password atleast 6 characters" });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User email is already existed!" });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res
        .status(404)
        .json({ success: false, message: "Username is already existed!" });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = [
      "/client/public/icons/yellow.jpg",
      "/client/public/icons/blue.jpg",
      "/client/public/icons/red.jpg",
      "/client/public/icons/octal.jpg",
    ];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      return res.status(201).json({
        success: true,
        user: {
          ...newUser._doc,
          password: "",
        },
        message: "User Registered Success",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error in Registering User",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is Required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
      message: "User LoggedIn Success",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt-movieplix", "", { maxAge: 0 });

    res.status(200).json({ success: true, message: "Logged Out Success!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function authCheck(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
