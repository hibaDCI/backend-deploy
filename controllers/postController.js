import Post from "../models/post.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user.js";

//! this route used the isAuthorized middleware
//? and another time we all also used passport jwt middleware
export const createPost = async (req, res, next) => {
  const data = req.body;
  // const token = req.cookies.access_token;

  // if (token) {
  // const decoded = jwt.verify(token, process.env.SECRET);

  data.author = req.user;

  const newPost = await Post.create(data);

  res.status(200).json({msg: "you verified ", newPost});
  return;
  // } else {
  //   res.status(403).json({msg: "not verify"});
  // }
  // will run with passort , later will be modified to make router work with passort
  // res
  //   .status(200)
  //   .json({msg: "only you because you're authenticated can create post 😀"});
};

export const updatePost = async (req, res, next) => {
  console.log(req.user);

  try {
    const updatedPost = await Post.findOneAndUpdate(
      {_id: req.params.id, author: req.user},
      {title: req.body.title},
      {new: true}
    );

    res.status(200).json({message: "updated post successfully", updatedPost});
  } catch (error) {
    next(error);
  }

  /*
  // const token = req.cookies.access_token;

  // const data = await User.findOne({
  //   _id: jwt.verify(token, process.env.SECRET).sub,
  // });
  // console.log(data);

*/
  /* // if without isAuthorized midddleware
  const token = req.cookies.access_token;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    //! other way to update
    const foundPost = await Post.findOneAndUpdate(
      {author: decoded.sub},
      {title: req.body.title},
      {new: true}
    );
    res.status(200).json(foundPost);
     */

  /* 
    ! one way to update
    const post = await Post.findOne({_id: req.params.id, author: decoded.sub});

    await post.updateOne({title: req.body.title});
    const post = await Post.findOneAndUpdate(
      {_id: req.params.id, author: decoded.sub},
      {title: req.body.title},
      {new: true}
    ); */

  // return;
  // } else {
  //   return res
  //     .status(400)
  //     .json({message: "not authorized to update this post"});
  // }
};

export const getAllPost = async (req, res, next) => {
  const data = await Post.find();

  res.status(200).json(data);
};
