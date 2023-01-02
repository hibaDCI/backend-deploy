import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
  createPost,
  updatePost,
  getAllPost,
} from "../controllers/postController.js";
import isAuthorized from "../helpers/isAuthorized.js";
const router = express.Router();

// router.use(passport.authenticate("jwt", {session: false})); // session is false because we are useing token the jwt in the server

router.post(
  "/create",
  passport.authenticate("jwt", {session: false}),
  createPost
);
router.post("/update/:id", isAuthorized, updatePost);
router.get("/all", isAuthorized, getAllPost);
export default router;
