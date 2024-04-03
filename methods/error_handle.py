import re
from data.themes import themes


def check_error(author, theme, daily, specific_quote, specific_quote_index, exclude_indexes, quotes):
    """
    Check for errors in the input parameters
    :param exclude_indexes: a list of indexes to exclude from the quotes
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
    # Mutually Exclusive Parameters Error Handling
    if specific_quote is not None and specific_quote_index is not None:
        return "Cannot use both specific_quote and specific_quote_index", 400
    if (specific_quote is not None or specific_quote_index is not None) and (author is not None or daily is not None or
                                                                             exclude_indexes is not None):
        return "Cannot use specific_quote or specific_quote_index with author or daily_quote", 400
    if specific_quote_index is not None and specific_quote_index not in range(len(quotes)):
        return "Invalid index for specific_quote_index", 400

    # Specific Quote Error Handling
    if specific_quote is not None:
        quotes = [quote for quote in quotes if quote[0][:len(specific_quote)].lower() == specific_quote.lower()]
        if len(quotes) == 0:
            return ("No quotes found for this given quote. This value should be the start of a quote"
                    "including a comma ex.(\"I think therefore I) is a valid input. As it starts with a quote and is "
                    "specific enough to autocomplete"), 404
        if len(quotes) > 1:
            return "Multiple quotes found for this given quote, be more specific in your parameter", 404

    # Exclude Indexes Error Handling
    if exclude_indexes is not None:
        if not re.match(r'^[0-9, ]*$', exclude_indexes):
            return "Invalid value for exclude_indexes. It only contain numeric, whitespace, and commas. ex.(1, 2, 3)", 400
        try:
            exclude_indexes = [int(index) for index in exclude_indexes.split(",") if index.strip()]
        except ValueError:
            return ("Invalid value for exclude_indexes. It should be a list of numeric integers, separated by commas "
                    "ex.(1, 2, 3) "), 400
        index_set = set(quote[2] for quote in quotes)
        for values in exclude_indexes:
            if values not in index_set:
                return "Invalid index for exclude_indexes, make sure all are valid ids", 400
        quotes = [quote for quote in quotes if quote[2] not in exclude_indexes]

    # Parameter Error Handling
    if theme is not None and theme.lower() not in themes.keys():
        return "Invalid theme", 422
    if author is not None:
        quotes = [quote for quote in quotes if quote[1].lower() == author.lower()]
        if len(quotes) == 0:
            return "No quotes found for this given author", 404
