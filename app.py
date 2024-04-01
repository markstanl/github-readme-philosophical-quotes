# app.py

from flask import Flask, send_file, request
from PIL import Image, ImageDraw, ImageFont
from textwrap import wrap
import random
import os
from quotes import quotes  # Assuming quotes is a list of quotes

app = Flask(__name__)


@app.route('/generate_image', methods=['GET'])
def generate_image():
    """
    Generates an image with a random quote and author

    Args:
        inputted_author (str): an author used to filter the quotes

    Returns:
        image: a generated image with a quote and author

    Raises:
        404: If no quotes are found for the given author
    """

    global quotes  # Apparently necessary

    inputted_author = request.args.get('author', default=None, type=str)

    if inputted_author is not None:  # Filter quotes by author
        filtered_quotes = [quote for quote in quotes if quote[1] == inputted_author]
        if len(filtered_quotes) == 0:
            return "No quotes found for this given author", 404
        else:
            quotes = filtered_quotes

    quote, author = random.choice(quotes)
    author = f'- {author}'

    # Load background image
    image_path = "assets/background.jpg"
    background_image = Image.open(image_path)

    # Create drawing context
    draw = ImageDraw.Draw(background_image)

    # Define font and size
    quote_font_path = "assets/Philosopher-Italic.ttf"
    author_font_path = "assets/Rambla-Italic.ttf"
    quote_font_size = 0

    if len(quote) < 100:  # Adjust font size based on quote length
        quote_font_size = 30
        wrapped_quote = wrap(quote, width=25)
    elif len(quote) < 160:
        quote_font_size = 25
        wrapped_quote = wrap(quote, width=25)
    elif len(quote) < 200:
        quote_font_size = 20
        wrapped_quote = wrap(quote, width=30)
    else:
        quote_font_size = 15
        wrapped_quote = wrap(quote, width=40)
    quote_font = ImageFont.truetype(quote_font_path, size=quote_font_size)

    size = 30
    if len(author) < 8:  # adjust the x distance based on the length of the author's name
        x_distance = 220
    elif len(author) < 12:
        x_distance = 190
    elif len(author) < 15:
        x_distance = 150
    elif len(author) < 19:
        x_distance = 100
    elif len(author) < 22:
        x_distance = 80
    else:
        x_distance = 80
        size = 25

    author_font = ImageFont.truetype(author_font_path, size=size)
    # Calculate the height of the text box
    text_height = sum(
        draw.textbbox((0, 0), line, font=quote_font)[3] - draw.textbbox((0, 0), line, font=quote_font)[1] for line in
        wrapped_quote)

    # define and redefine the initial y position
    move_up_by = 50
    quote_y = ((background_image.height - text_height) // 2) - move_up_by

    # Set text color
    text_color = (255, 255, 255)  # White color
    draw.text((x_distance, 175), author, fill=text_color, font=author_font)  # Draw the author's name on the image
    text_color = (171, 210, 0)  # Neon Green Color

    for line in wrapped_quote:
        # Calculate x position for this line
        x = (background_image.width - draw.textbbox((0, 0), line, font=quote_font)[2]) // 2

        # Draw the text on the image
        draw.text((x, quote_y), line, fill=text_color, font=quote_font)

        # Update the y position for the next line
        quote_y += draw.textbbox((0, 0), line, font=quote_font)[3] - draw.textbbox((0, 0), line, font=quote_font)[1]

    # Save the modified image
    output_image_path = os.path.join(os.getcwd(), "output_image.jpg")
    background_image.save(output_image_path)

    # Send the image file to the client
    return send_file(output_image_path, mimetype='image/jpeg')


if __name__ == "__main__":
    app.run()
