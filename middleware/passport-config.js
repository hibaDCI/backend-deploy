import passportJWT from "passport-jwt";
import User from "../models/user.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configureJwtStrategy = (passport) => {
  console.log("hello");
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.access_token,
        //where is the token located in the request
        // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
        //which secret was used to sign it?
        secretOrKey: process.env.SECRET,
      },
      (jwtPayload, done) => {
        // here is called serialize and deserialize
        return User.findById(jwtPayload.sub)
          .select("_id ")
          .then((user) => {
            //attach a user object to the request object.
            //first parameter is error paramter: null
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};

export default configureJwtStrategy;

// in the server.js

//initialize passport so we can use passport within our express server.as middleware
//app.use(passport.initialize());
//configure passport to use our function / jwtstrategy
//configureJwtStrategy(passport);
