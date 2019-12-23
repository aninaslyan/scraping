import cheerio from "cheerio";
import axios from "axios";

const siteUrl = "https://remoteok.io/";
let siteName = "";

const categories = new Set();
const tags = new Set();
const locations = new Set();
const positions = new Set();


const fetchData = async () => {
    const result = await axios.get(siteUrl);
    console.log(result);
    return cheerio.load(result.data);
};

export const getResults = async () => {
    const $ = await fetchData();
    console.log($, 'bla');
    siteName = $('.top > .action-post-job').text();
    $(".tags .tag").each((index, element) => {
        tags.add($(element).text());
    });
    $(".location").each((index, element) => {
        locations.add($(element).text());
    });
    $("div.nav p").each((index, element) => {
        categories.add($(element).text());
    });

    $('.company_and_position [itemprop="title"]')
        .each((index, element) => {
            positions.add($(element).text());
        });

    return {
        positions: [...positions].sort(),
        tags: [...tags].sort(),
        locations: [...locations].sort(),
        categories: [...categories].sort(),
        siteName,
    };
};