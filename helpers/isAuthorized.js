import jwt from "jsonwebtoken";

import {promisify} from "util"; // node js module
/**
 * we can use isAuthorized as middleware every time the user should be authorized
 * @param {*}
 * @returns
 */
const isAuthorized = async (req, res, next) => {
  const token = req.cookies.access_token;
  // const token = req.header("x-auth");
  console.log("test token", token);
  if (!token) {
    return res.status(401).json({msg: "error not authorized"});
  }
  console.log(token, "test,uuu");
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  // const decoded = jwt.verify(token, decoded, process.env.SECRET);
  // I create this object (user)to be used when we need in the controller
  req.user = decoded.sub;

  next();
};
export default isAuthorized;

// with Bearer in header
// export const isAuthorized = async (req, res, next) => {
//   try {
//     let token;

//     //  1- check authorization in header
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       // 2- if existing now verify
//       token = req.headers.authorization.split(" ")[1];
//       if (!token) return next(createEror(403, "you need to logged in"));
//       const decoded = await promisify(jwt.verify)(token, process.env.SECRET); // to recive a promise
//       console.log(token);
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// export default isAuthorized;
