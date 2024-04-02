from data.themes import themes


def check_error(author, theme, daily, specific_quote, specific_quote_index, quotes):
    """
    Check for errors in the input parameters
    :param author: the inputted author to filter the quotes by
    :param theme: the inputted theme to select the color theme
    :param daily: a boolean value to decide when to regenerate the quote
    :param specific_quote: a specific quote to be used
    :param specific_quote_index: the index of a specific quote
    :param quotes: the list of quotes to be filtered
    :return:
        - 400: A status code indicating that the daily_quote parameter is invalid or multiple mutually exclusive
                parameters are used at once
        - 404: A status code indicating that no quotes were found for the inputted author or specific quote
        - 422: A status code indicating that the theme parameter is invalid
        - 404: A status code indicating that no quotes were found for the inputted author
    """
    # Specific Quote Error Handling
    if specific_quote is not None and specific_quote_index is not None:
        return "Cannot use both specific_quote and specific_quote_index", 400
    if (specific_quote is not None or specific_quote_index is not None) and (author is not None or daily is not None):
        return "Cannot use specific_quote or specific_quote_index with author or daily_quote", 400
    if specific_quote_index is not None and specific_quote_index not in range(len(quotes)):
        return "Invalid index for specific_quote_index", 400
    if specific_quote is not None:
        quotes = [quote for quote in quotes if quote[0][:len(specific_quote)].lower() == specific_quote.lower()]
        if len(quotes) == 0:
            return "No quotes found for this given quote", 404
        if len(quotes) > 1:
            return "Multiple quotes found for this given quote", 404
    # Parameter Error Handling
    if theme is not None and theme.lower() not in themes.keys():
        return "Invalid theme", 422
    if author is not None:
        quotes = [quote for quote in quotes if quote[1].lower() == author.lower()]
        if len(quotes) == 0:
            return "No quotes found for this given author", 404

