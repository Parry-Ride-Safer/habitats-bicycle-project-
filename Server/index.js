const { setupRoutes } = require("./src/app");
const express = require("express");
var cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
 }

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors(corsOptions));
setupRoutes(app);

app.listen(4000, () => console.log(`Server is running in port ${port}`));
