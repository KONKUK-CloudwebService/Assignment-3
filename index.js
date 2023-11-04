const serverless = require("serverless-http"); // Lambda

const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const dataSource = require("./models/appDataSource");
const routes = require("./routes");
const baseResponse = require("./utils/baseResponse");

const initializeDataSource = async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error(`Initialize Error: ${error}`);
  }
};

// 데이터 소스를 즉시 초기화하려는 경우 여기서 호출
initializeDataSource();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);
app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});
// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "Welcome to the API" });
// });

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();

module.exports.handler = serverless(app);
