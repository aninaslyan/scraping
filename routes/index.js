import express from "express";
const routes = express.Router();

import { TransparentButtons } from "../transparent-buttons";
import { TechStack } from "../tech-stack";

const siteUrl = "http://www.parzlogic.com/";

routes.get("/transparent-buttons", async function(req, res) {
    const resultData = await TransparentButtons(siteUrl);
    res.send(resultData);
});

routes.get("/tech-stack", async function(req, res) {
    const resultData = await TechStack(siteUrl);
    res.send(resultData);
});

module.exports = routes;