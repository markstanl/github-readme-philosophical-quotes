import themes from "../theme/index.mjs";

/**
 * Error handling for the query parameters
 *
 * @param author the author of the quote
 * @param theme the theme of the svg
 * @param daily the daily quote flag
 * @param specificQuote the specific quote to search for
 * @param includeIndexes the indexes to include
 * @param excludeIndexes the indexes to exclude
 * @param quotes the list of quotes to search through
 * @returns {null|string} null if no errors, string if error
 */
export default function checkError(author, theme, daily, specificQuote, includeIndexes, excludeIndexes, quotes) {
    // Mutually Exclusive Parameters Error Handling
    if (specificQuote && includeIndexes) {
        return "Cannot use both quote and include-indexes";
    }
    if ((specificQuote) && (author || daily || excludeIndexes)) {
        return "Cannot use quote with author, daily-quote, or exclude-indexes";
    }

    // Specific Quote Error Handling
    if (specificQuote) {
        quotes = quotes.filter(quote => quote.quote.substring(0, specificQuote.length).toLowerCase() === specificQuote.toLowerCase());
        if (quotes.length === 0) {
            return "No quotes found for this given quote. This value should be the start of a quote including a comma ex.(\"I think therefore I) is a valid input. As it starts with a quote and is specific enough to autocomplete";
        }
        if (quotes.length > 1) {
            return "Multiple quotes found for this given quote, be more specific in your query";
        }
    }

    // Exclude Indexes Error Handling
    if (excludeIndexes) {
        if (!/^[0-9, ]*$/.test(excludeIndexes)) {
            return "Invalid value for exclude-indexes. It only contain numeric, whitespace, and commas. ex.(1, 2, 3)";
        }
        try {
            excludeIndexes = excludeIndexes.split(",").map(index => parseInt(index.trim())).filter(index => !isNaN(index));
        } catch (error) {
            return "Invalid value for exclude-indexes. It should be a list of numeric integers, separated by commas ex.(1, 2, 3)";
        }
        let indexSet = new Set(quotes.map(quote => quote.id));
        for (let value of excludeIndexes) {
            if (!indexSet.has(value)) {
                return "Invalid index for exclude-indexes, make sure all are valid ids";
            }
        }
        quotes = quotes.filter(quote => !excludeIndexes.includes(quote.id));

    }

    if(includeIndexes){
        if (!/^[0-9, ]*$/.test(includeIndexes)) {
            return "Invalid value for exclude-indexes. It only contain numeric, whitespace, and commas. ex.(1, 2, 3)";
        }
        try {
            includeIndexes = includeIndexes.split(",").map(index => parseInt(index.trim())).filter(index => !isNaN(index));
        } catch (error) {
            return "Invalid value for exclude-indexes. It should be a list of numeric integers, separated by commas ex.(1, 2, 3)";
        }
        let indexSet = new Set(quotes.map(quote => quote.id));
        for (let value of includeIndexes) {
            if (!indexSet.has(value)) {
                return "Invalid index for exclude-indexes, make sure all are valid ids";
            }
        }
        quotes = quotes.filter(quote => !includeIndexes.includes(quote.id));
    }

    // Parameter Error Handling
    if (theme && !Object.keys(themes).map(key => key.toLowerCase()).includes(theme.toLowerCase())) {
        return "Invalid theme";
    }
    if (author) {
        quotes = quotes.filter(quote => quote.author.toLowerCase() === author.toLowerCase());
        if (quotes.length === 0) {
            return "No quotes found for this given author";
        }
    }
    return null;
}