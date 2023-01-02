import mongoose from "mongoose";
import {hashedPassword} from "../lib/hash-comparePassword.js";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPic: {type: String},
  // path: String,
});
//  if we hash here then no need to hash in controller (there is better not her)
// UserSchema.pre("save", async function (next) {
//   //only hash the password is it has been modified or is new
//   if (!this.isModified("password")) return next();
//   this.password = await hashedPassword(this.password);
//   next();
// });

const User = mongoose.model("user", UserSchema);
export default User;
