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
quotes_to_add = [
    ["\"I think, therefore I am.\"", "René Descartes"],

]
c.execute('''
    INSERT INTO quotes ()
''')

conn.commit()
conn.close()
