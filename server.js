require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const productRoute = require("./routes/Product");
const categoryRoute = require("./routes/category");
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("Data Base Connected");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
