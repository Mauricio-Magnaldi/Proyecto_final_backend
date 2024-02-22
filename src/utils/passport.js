import passport from "passport";
import { usersDao } from "../persistencia/daos/mongoDao/users.dao.js";
import { cartsDao } from "../persistencia/daos/mongoDao/carts.dao.js";
import { Strategy as LocalStrategy } from "passport-local"; //SI
import { Strategy as GithubStrategy } from "passport-github2"; //SI
//import { Strategy as GoogleStrategy } from "passport-google-oauth20"; //
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt"; //Primero se obtiene ExtractJwt y luego Strategy
import { hashData, compareData } from "./utils.js";
import configEnv from "../config/configDotenv.js";

const JWT_SECRET_KEY = configEnv.jwt_secret_key;

// passport.use("google", new GoogleStrategy({
//     clientID: configEnv.google_client_id,
//     clientSecret: configEnv.google_client_secret,
//     callbackURL: configEnv.google_callback_url,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             const user =  await usersDao.findByEmail(profile._json.email);
//             if (user) {
//                 if(user.from_google) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false);
//                 }
//             }
//             //signup
//             const createdCart = await cartsDao.createOne({products: []});
//             const infoUser = {
//                 first_name: profile._json.given_name,
//                 last_name: profile._json.family_name,
//                 email: profile._json.email,
//                 cart: createdCart._id,
//                 password: " ",
//                 from_google: true,
//             }
//             const createdUser = await usersDao.createOne(infoUser);
//             done(null, createdUser);
//         } catch (error) {
//             done(error);
//         }
//         done(null, false);
// }));

passport.use(
    "signup", 
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        }, 
        async (req, email, password, done) => {
            try {
                const userDB = await usersDao.findByEmail(email);
                if (userDB) {
                    return done(null, false);
                }
                const hashedPassword = await hashData(password);
                const createdUser = await usersDao.createOne({
                    ...req.body, 
                    password : hashedPassword,
                });
                done(null, createdUser);
             } catch (error) { 
                done(error);
             }
        }
    )
);

passport.use(
    "login", 
    new LocalStrategy(
    {
        usernameField: "email",
    }, 
    async (email, password, done) => {
        try {
            const userDB = await usersDao.findByEmail(email);
            if(!userDB) {
                return done(null, false);
            }
            const comparePassword = await compareData(password, userDB.password);
            if (!comparePassword) {
                return done(null, false);
            } 
            done(null, userDB);
        } catch (error) {
            done(error);
        }
    }
    )
);

passport.use("github", new GithubStrategy({
    clientID: configEnv.github_client_id,
    clientSecret: configEnv.github_client_secret,
    callbackURL: configEnv.github_callback_url,
    }, 
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userDB = await usersDao.findByEmail(profile._json.email);
            if ( userDB ) {
                if ( userDB.from_github ) {
                    return done(null, userDB);
                } else {
                    return done(null, false);
                }
            }
            /*
            El problema que tenía era que había configurado en GitHub como name: first_name-last_name entonces llegaba como null, al editarlo en GitHub como first_name last_name se pudo resolver.
            */
            const createdCart = await cartsDao.createOne({products: []});
            const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1] || "",
                email: profile._json.email || profile.emails[0].value,
                cart: createdCart._id,
                password: " ",
                from_github: true,
            }
            const createdUser = await usersDao.createOne(newUser);
            done(null, createdUser);
        } catch (error) {
            done(error);
        }
}));

//jwt con passport
// passport.use("jwt", new JWTStrategy({
//     secretOrKey: JWT_SECRET_KEY, 
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// }, 
// async(jwt_payload, done) => {
//     done(null, jwt_payload);
// }));

//jwt con passport mediante cookies
const fromCookies = (req) => {
    return req.cookies.token;    
}

passport.use("jwt", new JWTStrategy(
    {
        secretOrKey: JWT_SECRET_KEY, 
        jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
    },
    async (jwt_payload, done) => {
        done(null, jwt_payload);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
passport.deserializeUser(async function(id, done) {
    try {
        const user = await usersDao.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});