import User from "../models/user.model.js";

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

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User email is already existed!" });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(404)
        .json({ success: false, message: "Username is already existed!" });
    }

    const PROFILE_PICS = ["/yellow.jpg", "/blue.jpg", "/red.jpg", "/octal.jpg"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await User({
      email,
      password,
      username,
      image,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "User Registered!" + newUser.username,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  res.status(200).json("Signup Control");
}

export async function logout(req, res) {
  res.status(200).json("Signup Control");
}
