import mongoose from "mongoose";
import configEnv from "./configDotenv.js";

const URI = configEnv.mongo_uri;

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la BD MongoDB."))
  .catch((error) => console.log(error));
