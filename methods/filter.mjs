import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {quoteToArray} from "./quoteArray.mjs";

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

    const objects = await db.all('SELECT * FROM quotes');
    // filter the rows

    return objects;
}

/**
 *
 * @param quoteArray
 * @param author
 * @param daily_quote
 * @param searchQuote
 * @param include_indexes
 * @param exclude_indexes
 * @returns {Promise<Array<{id: number, quote: string, author: string}>>}
 */
export async function filter(quoteArray, author, dailyQuote, searchQuote, includeIDs, excludeIDs){
    let quotes = quoteArray;
    if(dailyQuote){
        return dailyQuote(quotes);
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

const dailyQuote = (quoteArray) => {
    let now = new Date();
    let currentDay = new Date(now.getFullYear(), 0, 0) / 86400000;
    return [quoteArray[Math.floor(Math.floor(currentDay) % quoteArray.length)]];

}


//console.log(filter().then(console.log))