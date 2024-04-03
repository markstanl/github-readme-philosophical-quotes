import sqlite3
from quotes import quotes_original

conn = sqlite3.connect('quotes.db')
c = conn.cursor()

# Check if table exists and create it if not
c.execute('''
    CREATE TABLE IF NOT EXISTS quotes
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
     quote text, author text)
''')


#
# for quote in quotes_original:
#     c.execute("INSERT INTO quotes (quote, author) VALUES (?, ?)", (quote[0], quote[1]))


conn.commit()
conn.close()
