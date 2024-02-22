import express from 'express';
import handlebars from "express-handlebars";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";

import { __dirname } from "./utils/utils.js";
import configEnv from "./config/configDotenv.js";
import "./config/configDB.js";
import "./utils/passport.js";

import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import { Server } from "socket.io";
import { messagesHandler } from "./handlers/handlers.js";

const app = express();
const PORT = configEnv.port;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

const URI = configEnv.mongo_uri;

//session
app.use(
    session({
        secret: configEnv.session_secret,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        store: new mongoStore({
            mongoUrl: URI,    
        }),
    })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

//app.use("/loggerTest", loggerTestRouter);

app.use("/api/views", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.`);
})

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
    await messagesHandler(socketServer, socket);
}

socketServer.on("connection", onConnection);