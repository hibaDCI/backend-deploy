import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sgMail from "@sendgrid/mail";
//! 1- to use jwt passport stratigy
import passport from "passport";
import cors from "cors";
// we will not use it since we will use the passport
import cookieParser from "cookie-parser";
//route imports
import userRoutes from "./routes/userRouter.js";
import postRouters from "./routes/postRouter.js";
//! 2-
import configureJwtStrategy from "./middleware/passport-config.js";
//Loads .env file contents into process.env.
dotenv.config();

const app = express();

//allow us to parse json information from http body to req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({origin: true, credentials: true}));
var corsOptions = {
  // credential: true, //make sure the header is set
  origin: "https://front-app-p7qd.onrender.com",
  // origin: ["https://front-app-p7qd.onrender.com", "http://localhost:3001"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
/* You need to actually serve the images that reside in your uploads folder. One way to do this is to use the express static middleware. Assuming your uploads folder resides in your app's root, you'd simply add to your express app:

app.use("/uploads", express.static('uploads')) */
app.use("/uploads", express.static("uploads"));

//! 3-initialize passport so we can use passport within our express server.
app.use(passport.initialize());
//! 4- configure passport to use our function / jwtstrategy
configureJwtStrategy(passport);

//connecting to the database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jz6ge.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log(" DB connection successfully connected 🙂"))
  .catch((error) => console.log(error));

//registering routes
// =====================================================================
app.post("/backend/sendEmail", (req, res) => {
  const {username, message, email} = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_SUPER);
  // const msg = {
  //   to: "test@example.com", // Change to your recipient
  //   from: "test@example.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };

  const msg = {
    from: "hiba.al-aani@digitalcareerinstitute.org", // Official Verified email of your website/company

    to: "alaani.hiba@gmail.com", // where to send the email
    // templateId: process.env.SENDGRID_TEMPLATE_ID,
    //subject: 'Email system test by sendgrid',
    // dynamicTemplateData: {

    subject: "Email system test by sendgrid",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    // },
    // html: `
    // <h2>Hi, Mr ${username}. send you a message.</h2>
    // <p>Message is: ${message}</p>
    // <h3>User email: ${email} </h3>
    // `
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Successfully send!");
      res.json({msg: "Email Successfully send! Thanks."});
    })
    .catch((err) => console.error(err));
});
//===========================================================================
app.use("/api/users", userRoutes);
app.use("/api/post", postRouters);
// app.post("/testcookie", (req, res) => {
//   res.cookie("test", "hello").json({msg: "hello test"});
// });

// =====================================================================================
//listening for requests.

//? CSRF

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(
    "Server is listening for HTTP requests on port ",
    process.env.PORT
  );
});
