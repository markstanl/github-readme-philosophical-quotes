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
    <img alt="" src="https://skillicons.dev/icons?i=js,express,sqlite,ubuntu" />
  </a>
</p>


## Overview
The philosophical quotes generator is an API that allows you to add a philosophical quote image to your GitHub README. It is important to note that
just because a quote is included in the generator, doesn't necessarily mean that I agree wholeheartedly with the position the philosopher is taking.
In fact, many of the quotes here are contradictory and take positions against other quoted philosophers. The purpose of philosophy is to work together
to try and find the truth, those who disagree with you are not your enemy, but rather your ally. 

This API is built using express, and inspired by the [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats) project by Anurag Hazra.

<p align="center">
  <img src="assets/media/Quote Image.jpg" alt="Icon"/>
</p>

## Usage
The server that hosts this API is on DigitalOcean, and you can access it by using the following URL:

```markdown
http://147.182.254.93:8000/generate-image?timestamp=<current_timestamp>
```

You can use the query parameters in the next section to customize the quote image that is generated

The only thing I request is to star this repository, and add the following comment to your README:

```markdown
<!-- Generated by the Philosophical Quotes API https://github.com/markstanl/Philosophical-Quotes-API/blob/main/README.md -->
```

## Query Parameters

| Parameter     | Description                                                                                                                                                              |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `author`      | This parameter allows you to filter the quotes by the name of the philosopher who said the quote. It is case-insensitive.                                                |
| `theme`       | This parameter allows you to filter the quotes by the theme, i.e., the color scheme. It is case-insensitive.                                                             |
| `daily_quote` | If you would rather only have the quote generated daily, you can use this parameter. It will only generate a new quote once per day. Any value makes this work           |
| `quote`       | This parameter allows you to generate a specific quote. Simply put in the quote you would like to generate. It is case-insensitive and must start with a quotation mark. |
| `include-ids` | This parameter allows you to restrict generation to only include certain ID values.                                                                                      |
| `exclude-ids` | This parameter allows you to restrict certain ID values from the generation                                                                                              |
| `timestamp`   | This parameter is used to generate a unique quote based on the current timestamp, only put <current_timestamp> as a value                                                |

### Author
You can filter by the name of the philosopher who said the quote. The author parameter is case-insensitive. Here is a list of the authors you can filter by:

| Authors             | Authors               | Authors             |
|---------------------|-----------------------|---------------------|
| Albert Camus        | Alastair Norcross    | Aristotle           |
| Bertrand Russell    | Daniel Quinn         | David Hume          |
| Friedrich Nietzsche | Harry Frankfurt      | Immanuel Kant       |
| Jean-Jacques Rousseau | Jean-Paul Sartre    | Jeremy Bentham      |
| John Rawls          | Ludwig Wittgenstein  | Martin Heidegger    |
| Martha Nussbaum     | Oliver Goldsmith     | Peter Singer        |
| Plato               | René Descartes       | Richard Dawkins     |
| Sam Harris          | Simone de Beauvoir   | Socrates            |


### Theme
You can filter by the theme of the quote, i.e., the color scheme. The theme parameter is case-insensitive. Here is a list of the themes you can filter by:
These themes are based on gprm's GitHub readme stats themes. You can find the project [here](https://gprm.itsvg.in/).

| Theme Names | Theme Names | Theme Names |
|-------------|-------------|-------------|
| default | dark | radical |
| merko | gruvbox | tokyonight |
| synthwave | highcontrast | dracula |
| prussian | monokai | vue |
| vue-dark | shades-of-purple | nightowl |
| buefy | blue-green | algolia |
| great-gatsby | darcula | bear |
| solarized-dark | solarized-light | chartreuse-dark |
| nord | gotham | material-palenight |
| graywhite | vision-friendly-dark | ayu-light |
| midnight-purple | calm | flag-india |
| omni | react | jolly |
| maroongold | yeblu | blueberry |
| slateorange | kacho_ga | city_light |
| swift | | |

<p align="center">
  <img src="assets/media/themes.png" alt="themes"/>
</p>

### Daily Quote
If you would rather only have the quote generated daily, you can use the daily_quote parameter.
This will only generate a new quote once per day. The daily-quote parameter is boolean, any value works for an input

### Specific Quote
If you would like to generate a specific quote, you can use the quote parameter. Simply put in the quote
you would like to generate. The quote parameter is case-insensitive and will find a match if you type in the start of
the quote, and it is unique, but _must_ start with a quotation mark.

| Request                                            | Status             | Description                                                                                                                                                    |
|----------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/generate-image?quote="I think, therefore I am."` | :heavy_check_mark: | This is the most clear and will be successful                                                                                                                  |
| `/generate-image?quote="I think, therefore I am`   | :heavy_check_mark: | This will also be successful, as it completes the quote as long as the start is unique                                                                         |
| `/generate-image?quote="I think`                   | :warning:          | This will likely not be successful, as it is not unique enough. Though it may be successful, future updates may provide other quotes that start with "I think" |
| `/generate-image?quote=I think, therefore I am.`   | :x:                | This will not be successful, as it does not start with a quotation mark                                                                                        |
### Include and Exclude IDs
If you would like to limit or exclude certain ids from the generation, you can use the exclude-ids or include-ids parameter. 
This will limit the ids you provide from the generation. exclude-ids will remove the quotes with the listed ids from generations,
include-ids will restrict the generation to only include the quotes with the listed ids.
To use this, find the id values of the quotes you wish to exclude, and put them in a comma-separated list.

| Request                                     | Status             | Description                                                                                                                                       |
|---------------------------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `/generate-image?exclude-ids=1,2,3`         | :heavy_check_mark: | This will exclude the first three quotes from the generation                                                                                      |
| `/generate-image?exclude-ids=1`             | :heavy_check_mark: | This will exclude the first quote from the generation                                                                                             |
| `/generate-image?exclude-ids=1,18, 6`       | :heavy_check_mark: | This will exclude the first, sixth, and eighth quotes from the generation                                                                         |
| `/generate-image?exclude-ids=1, 18, 6`      | :warning:          | This will exclude the first nine quotes from the generation, but the spaces after the commas are not necessary and may cause issues               |
| `/generate-image?exclude-ids=1, 1 1, 10000` | :x:                | This will not be successful, the second value is not a number, and there is not a quote with id value 10000                                       |


### Timestamp
To gain a unique quote for every README reload, you can use the timestamp parameter. This will generate a unique quote based on the current timestamp, which changes every minute.

![Generated Image](http://147.182.254.93:8000/generate-image?theme=merko&timestamp=%3Ccurrent_timestamp%3E&quote=%22One%20must%20imagine%20Sisyphus%20happy.%22)
