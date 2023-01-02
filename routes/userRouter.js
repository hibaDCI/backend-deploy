import express from "express";
import passport from "passport";
import upload from "../config/multer.js";

import {
  getAllUsers,
  login,
  registerUser,
  contactPost,
} from "../controllers/userController.js";
import isAuthorized from "../helpers/isAuthorized.js";

const router = express.Router();
// if I want to secure this route that only authenticated user can see all users
// router.get("/", passport.authenticate("jwt", {session: false}), getAllUsers);
// without authorized
// router.get("/", getAllUsers);

router.post("/login", login);
router.get("/all", isAuthorized, getAllUsers);
router.post("/register", upload.single("userPic"), registerUser);
router.post("/contact", contactPost);
export default router;
