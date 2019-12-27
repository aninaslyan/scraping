import { cleanURL, lookupPromise } from "./helper";

export const Whois = async (url) => {
    let cleanUrl = cleanURL(url);

    try{
        const ipAddress = await lookupPromise(url);
        console.log(ipAddress);
        return {
            url: cleanUrl,
            ip: ipAddress
        }
    }catch(err){
        console.error(err);
    }
};