import { cleanURL } from "./helper";
import { fetchData } from "./helper";

const transparentButtons = new Set();

export const TransparentButtons = async (url) => {
    let cleanUrl = cleanURL(url);

    try {
        const $ = await fetchData(cleanUrl);

        // style tag
        // $('style').each((index, element) => {
        //     console.log($(element).html(), 'style tag');
        //     transparentButtons.add($(element).html());
        // });

        //todo give parent element information, or some text near to that
        $("button").attr('style',  'background-color:transparent').each((index, element) => {
            console.log(element, 'button with transparent style');
            transparentButtons.add($(element).html());
        });

        $("a").attr('style',  'background-color:transparent').each((index, element) => {
            console.log(element, 'a with transparent style');
            transparentButtons.add($(element).html());
        });

        return {
            url: cleanUrl,
            transparentButtons: [...transparentButtons].sort(),
        };
    } catch(e) {
        console.log(e.message, 'Bottom error');
    }
};