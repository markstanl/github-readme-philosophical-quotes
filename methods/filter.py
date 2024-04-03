import time


def filter_by_author(quotes, author):
    """
    Filters quotes by author
    :param quotes: The list of quotes to be filtered
    :param author: The inputted author to filter the quotes by
    :return:
        - quotes: A list of quotes by the inputted author
    """
    return [quote for quote in quotes if quote[1].lower() == author.lower()] if author else quotes


def filter_to_daily_quote(quotes):
    """
    Filters quotes to get a quote based on the current day
    :param quotes: The list of quotes to be filtered
    :return:
        - quotes: The filtered list of quotes with a single quote inside
    """
    current_day = int(time.time()) / 86400
    return [quotes[int(current_day) % len(quotes)]]

def filter_by_excluded_ids(quotes, exclude_indexes):
    """
    Filters quotes by excluded indexes
    :param quotes: The list of quotes to be filtered
    :param exclude_indexes: The original string of numbers to be excluded
    :return:
        - quotes: The filtered list of quotes with a single quote inside
    """
    exclude_indexes = [int(index) for index in exclude_indexes.split(",") if index.strip()]
    return [quote for quote in quotes if quote[2] not in exclude_indexes]


def get_specific_quote(quotes, specific_quote):
    """
    Filters quotes to get a specific quote
    :param quotes: The list of quotes to be filtered
    :param specific_quote: The specific quote to be filtered
    :return:
        - quotes: The filtered list of quotes with a single quote inside
    """
    return [quote for quote in quotes if quote[0][:len(specific_quote)].lower() == specific_quote.lower()]


def get_quote_by_index(quotes, specific_quote_index):
    """
    Filters quotes to get a specific quote by index
    :param quotes: The list of quotes to be filtered
    :param specific_quote_index: The index of the specific quote to be filtered
    :return:
        - quotes: The filtered list of quotes with a single quote inside
    """
    return [quote for quote in quotes if quote[2] == specific_quote_index]
