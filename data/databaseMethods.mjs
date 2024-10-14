import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function printDatabase() {
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    // Query the database
    const rows = await db.all('SELECT * FROM quotes');

    console.log(rows);
}

async function printAuthors() {
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    const authors = await db.all('SELECT DISTINCT author FROM quotes');

    authors.map(author => console.log(author.author));
}

async function printQuotesByAuthor(author){
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    const quotes = await db.all('SELECT quote FROM quotes WHERE author = ?', author);

    console.log(quotes);
}

async function addQuote(quote, author, id) {
    // Open the database
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    let newId;
    if(id === undefined) {
        const ids = await db.all('SELECT id FROM quotes ORDER BY id ASC');
        for(let i = 0; i < ids.length - 1; i++) {
            if(ids[i+1].id - ids[i].id > 1) {
                newId = ids[i].id + 1;
                break;
            }
        }
        if(newId === undefined) {
            newId = ids[ids.length - 1].id + 1;
        }
    }
    else{
        const idExists = await db.get('SELECT id FROM quotes WHERE id = ?', id);
        if(idExists === undefined) {
            const newId = id;
        }else{
            throw new Error('ID already exists');
        }
    }

    // Insert the quote into the database
    await db.run('INSERT INTO quotes (quote, author, id) VALUES (?, ?, ?)', quote, author, newId);
    console.log(`Added ${quote} by ${author} with id ${newId}`);
}

async function removeQuote(id) {
    // Open the database
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    // Remove the quote from the database
    await db.run('DELETE FROM quotes WHERE id = ?', id);
}

//jsonDatabase().catch(console.error);
//addQuote('Test quote', 'Test author').catch(console.error);
//removeQuote(48).catch(console.error);

async function main(){
    // await removeQuote(80)
    // const quote = "Rhetoric is the only area of expertise you need to learn. You can ignore all the rest and still get the better of the professionals!"
    // await addQuote(`\"${quote}\"`,
    //   "Gorgias",)
    //await jsonDatabase()
    //await printDatabase();
    await printAuthors();
    //await printQuotesByAuthor("Ludwig Wittgenstein")
}

main().catch(console.error);