import mongoose from "mongoose";
const {Schema} = mongoose;
const postSchema = new Schema({
  title: {type: String},
  date: {type: Date, default: Date.now()},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  desc: {type: String},
  likes: {type: Array},
});
const Post = mongoose.model("Post", postSchema);
export default Post;
