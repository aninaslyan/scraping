import { cleanURL } from "./helper";
import Wappalyzer from 'wappalyzer/driver';
import Browser from 'wappalyzer/browsers/zombie';

export const TechStack = async (url) => {
    let cleanUrl = cleanURL(url);

    const options = {
        debug: false,
        delay: 0,
        maxDepth: 5,
        maxUrls: 50,
        maxWait: 5000,
        recursive: false,
        userAgent: 'Wappalyzer',
        htmlMaxCols: 2000,
        htmlMaxRows: 2000,
    };

    const wappalyzer = new Wappalyzer(Browser, cleanUrl, options);
    const jsonData = await wappalyzer.analyze();
    const applications = (jsonData && jsonData['applications']) || [];
    return {
        url: cleanUrl,
        applications: applications.map(app => ({
            name: app.name,
            confidence: app.confidence,
            version: app.version,
            icon: app.icon,
            website: app.website,
            categories: app.categories.map(category => category[Object.keys(category)[0]])
        }))
    };
};