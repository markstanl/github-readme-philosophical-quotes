import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import shuffle from './shuffle.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Returns an initial unfiltered list of quote objects, each with an id, quote, and author, used for initial error
 * handling
 * @returns {Promise<Array<{id: number, quote: string, author: string}>>} a list of quote objects
 */
export async function allQuotes() {
    const db = await open({
        filename: path.join(__dirname, '../data/quotes.db'),
        driver: sqlite3.Database
    });
    return await db.all('SELECT * FROM quotes');
}

/**
 * Returns a single quote object from the list of quotes
 * @param quoteArray array with quote objects
 * @param seed  seed array
 * @returns {[*]}
 */
const dailyQuoteFilter = (quoteArray, seed) => {
    if(seed !== undefined){
        quoteArray = shuffle(quoteArray, seed);
    }
    const now = new Date();
    const start = new Date('2005-01-20');
    const differenceInTime = now.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return [quoteArray[differenceInDays % quoteArray.length]];
}


/**
 *
 * @param quoteArray the array of all quote objects
 * @param author the name of the author to filter by
 * @param dailyQuote boolean value to determine if the quote is a daily quote
 * @param searchQuote the specific quote we want to search for
 * @param includeIDs the indexes we want to include in generation
 * @param excludeIDs the indexes we want to exclude from generation
 * @returns {Promise<Array<{id: number, quote: string, author: string}>>}
 */
export async function filter(quoteArray, author, dailyQuote, searchQuote, includeIDs, excludeIDs, dailySeed){
    let quotes = quoteArray;
    if(dailyQuote){
        return dailyQuoteFilter(quotes, dailySeed);
    }
    if(author){
        quotes = quotes.filter(quote => quote.author.toLowerCase() === author.toLowerCase());
    }
    if(searchQuote){
        quotes = quotes.filter(quote => quote.quote.substring(0, searchQuote.length).toLowerCase() === searchQuote.toLowerCase());
    }
    if(includeIDs){
        let indexes = includeIDs.split(",").map(index => parseInt(index.trim()));
        quotes = quotes.filter(quote => indexes.includes(quote.id));
    }
    if(excludeIDs){
        let indexes = excludeIDs.split(",").map(index => parseInt(index.trim()));
        quotes = quotes.filter(quote => !indexes.includes(quote.id));
    }
    return quotes;
}