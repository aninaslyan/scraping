import { cleanURL } from "./helper";
import { fetchData } from "./helper";

export const TransparentButtons = async (url) => {
    let cleanUrl = cleanURL(url);

    const transparentButtons = [];
    let transparentButtonQuantity = 0;

    try {
        const $ = await fetchData(cleanUrl);

        // style tag content
        let valueExpression = /background(-color)?\s*:\s*transparent/gi;
        let valueExpressionElement = /[^}]+background(-color)?\s*:\s*transparent[^}]*}/gi;

        let rgbExpression = /background(-color)?\s*:\s*rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/gi;
        let rgbExpressionElement = /[^}]+background(-color)?\s*:\s*rgba\(\s*0,\s*0,\s*0,\s*0\s*\)[^}]*}/gi;

        $('style').each((index, element) => {
            let styleTagContent = $(element).html();

            let matchedWithRGBAElements = styleTagContent.match(rgbExpression);
            let matchedWithValueElements = styleTagContent.match(valueExpression);

            if (matchedWithRGBAElements && matchedWithRGBAElements.length > 0) {
                transparentButtonQuantity += matchedWithRGBAElements.length;
                transparentButtons.push(styleTagContent.match(rgbExpressionElement));
            } else if (matchedWithValueElements && matchedWithValueElements.length > 0) {
                transparentButtonQuantity += matchedWithValueElements.length;
                transparentButtons.push(styleTagContent.match(valueExpressionElement));
            }
        });

        // style attributes
        $("button[style='background-color:transparent'], button[style='background:transparent'], button[style='background:rgba(0, 0, 0, 0)'], button[style='background-color:transparent']")
            .each((index, element) => {
                transparentButtonQuantity++;
                transparentButtons.push($(element).html());
            });

        $("a div[style='background-color:transparent'], a div[style='background:transparent'], a div[style='background:rgba(0, 0, 0, 0)'], a div[style='background-color:rgba(0, 0, 0, 0)']")
            .each((index, element) => {
                transparentButtonQuantity++;
                transparentButtons.push($(element).html());
            });

        return {
            url: cleanUrl,
            transparentButtons,
            transparentButtonQuantity,
        };
    } catch (e) {
        console.log(e.message, 'Bottom error');
    }
};
