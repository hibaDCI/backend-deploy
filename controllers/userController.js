import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import authenticationHelper from "../helpers/generateToken.js";
import User from "./../models/user.js";

import jwt from "jsonwebtoken";
// use the sendgrid email function
import {sendEmail} from "../helpers/SendGrid.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

export const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    //check if there is a password?
    if (!email || !password) {
      return res
        .status(400)
        .json({mesage: "you should login with your email and password"});
    }

    //check if a user with that email address exists
    const user = await User.findOne({email: email});

    if (!user) {
      return res
        .status(400)
        .json({message: "No user found, you need to register"});
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      //generate a token for the user using the authentication helper
      const token = await authenticationHelper.generateToken(user);

      //!with cookie
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          // sameSite: "lax",
        })
        .json({message: "you logged in"});

      //! without cookie
      // return res
      //   .status(200)
      //   .json({message: "You are authenticated, welcome!", token});
    } else {
      return res.status(400).json({message: "No access granted, wrong info"});
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
// ===============================================================end of login
export const registerUser = async (req, res) => {
  //here you would check the validationResults

  try {
    let existingUser = await User.findOne({email: req.body.email});

    if (existingUser) {
      return res.status(400).json({msg: "User already exists"});
    }
    //we're hashing the password that the user provided us.
    // we don't want to store the password in plain text in the db

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //creating the user document into the users collection
    console.log(req.body, req.file);
    // const url = req.protocol + "://" + req.get("host");
    const createdUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      //file property has added by multer
      userPic: "/uploads/images/" + req.file.filename,
      // userPic: req.file?.path,

      password: hashedPassword,
    });
    //! create token without authentication helper
    // const payload = {sub: createdUser._id};
    // const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"});

    res
      .status(200)
      // .cookie("access_token", token, {httpOnly: true})
      .json({message: "User created", pic: createdUser.pic});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const getAllUser = async (req, res, next) => {
  const data = await User.find();

  res.status(200).json(data);
};

//! send email with send grid when user constact us

export const contactPost = (req, res, next) => {
  console.log(req.body);

  sgMail.setApiKey(process.env.SENDGRID_API_SUPER);
  const msg = {
    to: "alaani.hiba@gmail.com",
    from: "hiba.al-aani@digitalcareerinstitute.org",
    subjet: "contact info",
    html: "<h1>hello there</h1>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("your email has been sent successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
