import URL from 'url';
import axios from "axios";
import cheerio from "cheerio";
import dns from 'dns';

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
        console.log(e.message, 'Error');
    }
};

export const getData = async (url) => {
  try {
      const response = await axios.get(url);
      return response.data;
  } catch(e) {
      console.log(e.message, 'Error');
  }
};

export async function lookupPromise(url) {
    return new Promise((resolve, reject) => {
        dns.lookup(url, (err, address, family) => {
            if(err) reject(err);
            resolve(address);
        });
    });
};
