import URL from 'url';
import axios from "axios";
import cheerio from "cheerio";

export const cleanURL = (baseUrl) => {
    let { href, protocol } = URL.parse(baseUrl.toLocaleLowerCase());
    if (!protocol) {
        href = `http://${href}`;
    }

    return href ? href : baseUrl;
};

export const fetchData = async (siteUrl) => {
    try {
        const result = await axios.get(siteUrl);
        return cheerio.load(result.data);
    } catch (e) {
        console.log(e.message, 'Error Message');
    }
};