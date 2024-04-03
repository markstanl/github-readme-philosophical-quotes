import sqlite3
conn = sqlite3.connect('./data/quotes.db')
c = conn.cursor()

c.execute("SELECT * FROM quotes")
quotes_original = c.fetchall()

conn.close()