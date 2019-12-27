import express from "express";
const routes = express.Router();

import { TransparentButtons } from "../transparent-buttons";
import { TechStack } from "../tech-stack";
import { Whois } from "../whois";

const siteUrl = "medium.com";

routes.get("/transparent-buttons", async function(req, res) {
    const resultData = await TransparentButtons(siteUrl);
    res.send(resultData);
});

routes.get("/tech-stack", async function(req, res) {
    const resultData = await TechStack(siteUrl);
    res.send(resultData);
});

routes.get("/whois", async function(req, res) {
    const resultData = await Whois(siteUrl);
    res.send(resultData);
});

module.exports = routes;
