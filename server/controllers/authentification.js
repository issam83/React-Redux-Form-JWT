const User = require("../models/user");
const lodash = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("../../config");
const getToken = require("../utils");

exports.signIn = async (req, res, next) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken.getToken(signinUser)
    });
  } else {
    res.status(401).send({ msg: "invalid credentials" });
  }
};

// exports.auth = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.login = async (req, res, next) => {
//   check("email", "Please include a valid email").isEmail();
//   check("password", "Password is required").exists();

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({
//       email
//     });
//     if (!user) {
//       return res.status(400).json({ error: [{ msg: "Invalid credentials" }] });
//     }
//     const isMatch = bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: [{ msg: "Invalid credentials" }] });
//     }

//     // payload for jwt
//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: 360000
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.register = async (req, res) => {
//   check("email", "Please include a valid email").isEmail();
//   check(
//     "password",
//     "Please enter a password with 8 or more characters"
//   ).isLength({ min: 8 });

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array()
//     });
//   }
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: [{ msg: "User already exists" }] });
//     }

//     user = new User({ email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     // payload to generate token
//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: 360000
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server error");
//   }
// };
