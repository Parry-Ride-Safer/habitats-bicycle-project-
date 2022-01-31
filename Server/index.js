const { setupRoutes } = require("./src/app");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandleMiddleware } = require("./src/middleware");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

const port = process.env.PORT || 4000;

app.use(cookieParser());

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
setupRoutes(app);
app.use(errorHandleMiddleware);

app.listen(4000, () => console.log(`Server is running in port ${port}`));
