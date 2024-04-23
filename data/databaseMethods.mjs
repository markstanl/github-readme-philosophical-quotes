import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function jsonDatabase() {
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    // Query the database
    const rows = await db.all('SELECT * FROM quotes');

    console.log(rows);
}

async function addQuote(quote, author, id) {
    // Open the database
    const db = await open({
        filename: './quotes.db',
        driver: sqlite3.Database
    });

    if(id === undefined) {
        const highestIdRow = await db.get('SELECT MAX(id) as maxId FROM quotes');
        const newId = highestIdRow.maxId + 1;
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
    await addQuote("\"Knowledge is no guarantee of good behavior, but ignorance is a virtual guarantee of bad behavior.\"",
        "Martha Nussbaum")
    await jsonDatabase()
}

//main().catch(console.error);