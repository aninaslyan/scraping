import axios from "axios";
import cheerio from "cheerio";

const siteUrl = "https://remoteok.io/";

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    console.log(result);
    return cheerio.load(result.data);
};

export const transparentButtonDetector = async () => {
    const $ = await fetchData();
    const postJobButton = $('.top > .action-post-job').text();
    console.log(postJobButton) // Logs 'Post a Job'
};