<p align="center">
  <img src="assets/media/Title Card.jpg" alt="Title Card">
</p>

<p align="center">
  <img src="assets/media/icon.svg" alt="Icon" width="100" height="100"/>
</p>

![Python](https://img.shields.io/badge/python-v3.12.0-8A2BE2)
![Pull Requests](https://img.shields.io/github/issues-pr/markstanl/Philosophical-Quotes-API)
![Issues](https://img.shields.io/github/issues/markstanl/Philosophical-Quotes-API)
![Last Commit](https://img.shields.io/github/last-commit/markstanl/Philosophical-Quotes-API)
![License](https://img.shields.io/github/license/markstanl/Philosophical-Quotes-API)
![Stars](https://img.shields.io/github/stars/markstanl/Philosophical-Quotes-API)

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=py,pycharm,git" />
  </a>
</p>


## Overview
The philosophical quotes generator is an API that allows you to add a philosphical quote image into your GitHub README, such as this one

<p align="center">
  <img src="assets/media/Quote Image.jpg" alt="Icon"/>
</p>

`http://54.242.56.206:4000/generate_image?timestamp=<current_timestamp>`

## Query Parameters

 | Parameter    | Description                                                                                                                                                   |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `author`     | This parameter allows you to filter the quotes by the name of the philosopher who said the quote. It is case-insensitive.                                     |
| `theme`      | This parameter allows you to filter the quotes by the theme, i.e., the color scheme. It is case-insensitive.                                                  |
| `daily_quote`| If you would rather only have the quote generate daily, you can use this parameter. It will only generate a new quote once per day. Any value makes this work |
| `quote`      | This parameter allows you to generate a specific quote. Simply put in the quote you would like to generate. It is case-insensitive and must start with a quotation mark. |
| `quote_index`| This parameter allows you to generate a specific quote by index. Simply put in the index number of the quote in the quotes.py file. |
| `timestamp`  | This parameter is used to generate a unique quote based on the current timestamp, only put <current_timestamp> as a value                                     |

### Author
You can filter by the name of the philosopher who said the quote. The author parameter is case-insensitive. Here is a list of the authors you can filter by:

| Authors | Authors | Authors |
|---------|---------|---------|
| Albert Camus | Aristotle | Bertrand Russell |
| Daniel Quinn | David Hume | Friedrich Nietzsche |
| Immanuel Kant | Jean-Jacques Rousseau | John Rawls |
| Ludwig Wittgenstein | Martin Heidegger | Peter Singer |
| Plato | René Descartes | Richard Dawkins |
| Socrates | | |

### Theme
You can filter by the theme of the quote, i.e., the color scheme. The theme parameter is case-insensitive. Here is a list of the themes you can filter by:
These themes are based on gprm's GitHub readme stats themes. You can find the project [here](https://gprm.itsvg.in/).

| Theme Names | Theme Names | Theme Names |
|-------------|-------------|-------------|
| template | default | dark |
| radical | merko | gruvbox |
| tokyonight | synthwave | highcontrast |
| dracula | prussian | monokai |
| vue | vue-dark | shades-of-purple |
| nightowl | buefy | blue-green |
| algolia | great-gatsby | darcula |
| bear | solarized-dark | solarized-light |
| chartreuse-dark | nord | gotham |
| material-palenight | graywhite | vision-friendly-dark |
| ayu-light | midnight-purple | calm |
| flag-india | omni | react |
| jolly | maroongold | yeblu |
| blueberry | slateorange | kacho_ga |
| city_light | swift | |

### Daily Quote
If you would rather only have the quote generate daily, you can use the daily_quote parameter. 
This will only generate a new quote once per day. The daily_quote parameter is case-insensitive.

### Specific Quote
If you would like to generate a specific quote, you can use the quote parameter. Simply put in the quote
you would like to generate. The quote parameter is case-insensitive, and will find a match if you type in the start of 
the quote, and it is unique, but _must_ start with a quotation mark.

| Request | Status | Description |
|---------|--------|-------------|
| `/generate_image?quote="I think, therefore I am."` | :heavy_check_mark: | This is the most clear and will be successful |
| `/generate_image?quote="I think, therefore I am` | :heavy_check_mark: | This will also be successful, as it completes the quote as long as the start is unique |
| `/generate_image?quote="I think` | :warning: | This will likely not be successful, as it is not unique enough. Though it may be successful, future updates may provide other quotes that start with "I think" |
| `/generate_image?quote=I think, therefore I am.` | :x: | This will not be successful, as it does not start with a quotation mark |
### Specific Quote Index
If you would like to generate a specific quote by index, you can use the quote_index parameter. Simply put in the index
number of the quote in the quotes.py file. Because the list will likely change in the future, it is recommended to use the quote parameter instead

### Timestamp
To gain a unique quote for every README reload, you can use the timestamp parameter. This will generate a unique quote based on the current timestamp.

![Generated Image](http://147.182.254.93:5000/generate_image?theme=merko)
