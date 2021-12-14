const app = require("./src/app");

const port = process.env.PORT || 4000;

app.listen(4000, () => console.log(`Server is running in port ${port}`));
