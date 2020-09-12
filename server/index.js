const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const logger = require("morgan");
var path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

var userRouter = require("./routes/route");
var productRouter = require("./routes/product");
var categoryRouter = require("./routes/category");
var orderRouter = require("./routes/order");
var contactRouter = require("./routes/contact");

var app = express();

app.use(logger("dev"));
// expressServer.use(morgan("combined"));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

dotenv.config({ path: __dirname + "/.env" });

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/contact", contactRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Success -> MongoDB starting");
  })
  .catch(err => {
    console.log("Failed -> ", err);
  });

app.listen(process.env.PORT_SERVER_NODE, () =>
  console.log(
    `Success -> connection Server node on port: ${process.env.PORT_SERVER_NODE}`
  )
);

console.log("le serveur écoute sur le port :", process.env.PORT_SERVER_NODE);
