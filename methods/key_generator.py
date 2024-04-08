# frankly I don't understand what a secret key is or why I need it
import secrets

secret_key = secrets.token_hex(16)
print(secret_key)
