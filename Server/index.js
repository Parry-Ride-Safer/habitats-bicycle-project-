const { setupRoutes } = require("./src/app");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
setupRoutes(app);

app.listen(4000, () => console.log(`Server is running in port ${port}`));
