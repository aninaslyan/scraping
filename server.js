import express from "express";
const app = express();
const routes = require('./routes');

const port = 3000;

app.use("/", routes);
app.listen(port, () => console.log(`App listening on port ${ port }!`));