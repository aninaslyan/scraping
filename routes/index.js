import express from "express";
const routes = express.Router();

import { getResults } from "../index";

routes.get("/", async function(req, res) {
    const result = await getResults();
    res.send(result);
});

module.exports = routes;