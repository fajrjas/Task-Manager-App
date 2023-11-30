require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 4001;
const connectDB = require("./db/connect");
const pageRoute = require("./routes/pageRoute");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const { requireAuth, checkuser } = require("./middleware/authMiddleware");

app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(checkuser);
app.use("/", pageRoute);
app.use("/api/v1/users/auth", authRoute);
app.use("/api/v1/users/task", requireAuth, taskRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
