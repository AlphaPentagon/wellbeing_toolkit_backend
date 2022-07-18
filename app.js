import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import { RESOURCES_ROUTER } from "./routes/resources.js";
import FEEDBACK_ROUTER from "./routes/feedback.js";

const APP = express();
// 3000 is the front-end port
const PORT = process.env.PORT || 3000;

APP.use(logger("dev"));
APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({ extended: false }));
APP.use(cookieParser());
APP.use(express.static(path.join(__dirname, "public")));

APP.use("/resources", RESOURCES_ROUTER);
APP.use("/feedback", FEEDBACK_ROUTER);

if (process.env.NODE_ENV !== "test") {
  APP.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

APP.use(function (req, res, next) {
  res.status(404).json({
    message:
      "⛔ Page does not exist - please see the documentation for valid URI's 📓",
  });
});

APP.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default APP;
