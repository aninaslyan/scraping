import { cleanURL } from "./helper";
import { fetchData } from "./helper";
import { getData } from "./helper";

const stylesheetMatchButtonRegex = (styleTagContent) => {
    let transparentButtons = [];
    let transparentButtonQuantity = 0;

    let valueExpression = /background(-color)?\s*:\s*transparent/gi;
    let valueExpressionElement = /[^}]+background(-color)?\s*:\s*transparent[^}]*}/gi;

    let rgbExpression = /background(-color)?\s*:\s*rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/gi;
    let rgbExpressionElement = /[^}]+background(-color)?\s*:\s*rgba\(\s*0,\s*0,\s*0,\s*0\s*\)[^}]*}/gi;

    let matchedWithRGBAElements = styleTagContent.match(rgbExpression);
    let matchedWithValueElements = styleTagContent.match(valueExpression);

    if (matchedWithRGBAElements && matchedWithRGBAElements.length > 0) {
        transparentButtonQuantity += matchedWithRGBAElements.length;
        transparentButtons.push(...styleTagContent.match(rgbExpressionElement));
    } else if (matchedWithValueElements && matchedWithValueElements.length > 0) {
        transparentButtonQuantity += matchedWithValueElements.length;
        transparentButtons.push(...styleTagContent.match(valueExpressionElement));
    }

    return {
        transparentButtons,
        transparentButtonQuantity,
    }
};

export const TransparentButtons = async (url) => {
    let cleanUrl = cleanURL(url);

    let transparentButtons = [];
    let transparentButtonQuantity = 0;

    try {
        const $ = await fetchData(cleanUrl);

        // style tag content
        $('style').each((index, element) => {
            let styleTagContent = $(element).html();

            let buttonProps = stylesheetMatchButtonRegex(styleTagContent);
            transparentButtonQuantity += buttonProps.transparentButtonQuantity;
            transparentButtons.push(...buttonProps.transparentButtons);
        });

        // style attributes
        $("button[style='background-color:transparent'], button[style='background:transparent'], button[style='background:rgba(0, 0, 0, 0)'], button[style='background-color:transparent']")
            .each((index, element) => {
                transparentButtonQuantity++;
                transparentButtons.push($(element).html());
            });

        $("a[style='background-color:transparent'], a[style='background:transparent'], a[style='background:rgba(0, 0, 0, 0)'], a[style='background-color:rgba(0, 0, 0, 0)']")
            .each((index, element) => {
                transparentButtonQuantity++;
                transparentButtons.push($(element).html());
            });

        $("a div[style='background-color:transparent'], a div[style='background:transparent'], a div[style='background:rgba(0, 0, 0, 0)'], a div[style='background-color:rgba(0, 0, 0, 0)']")
            .each((index, element) => {
                transparentButtonQuantity++;
                transparentButtons.push($(element).html());
            });

        // external css files
        let links = [];
        let cleanLink = '';
        let stylesheetContent = '';

        $("link[href*='.css']")
            .each((index, element) => {
                if (element && element.attribs.href) {
                    cleanLink = element.attribs.href;
                    if (cleanLink.startsWith('/')) {
                        links.push(cleanUrl + cleanLink);
                    } else {
                        links.push(cleanLink);
                    }
                }
            });

        for (let link of links) {
            try {
                stylesheetContent = await getData(link);
                let buttonProps = stylesheetMatchButtonRegex(stylesheetContent);
                transparentButtonQuantity += buttonProps.transparentButtonQuantity;
                transparentButtons.push(...buttonProps.transparentButtons);

            } catch (e) {
                console.log(e.message);
            }
        }

        return {
            url: cleanUrl,
            transparentButtons,
            transparentButtonQuantity,
        };
    } catch (e) {
        console.log(e.message, 'Bottom error');
    }
};
