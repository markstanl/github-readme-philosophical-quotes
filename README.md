# Philosophical-Quotes

## Update (3/22/2024)
Unfortunately, I have had to remove this script from my Ubuntu EC2 instance, as running the server was costing around $20/month. This was an unnecessary expense. The code still works, and we have some updated quotes. I am currently looking for a more cost-effective hosting solution.

## Random API Philosophical Quotes  
This repository contains the code for my random philosophical image quote API. To access an example, simply put `http://54.242.56.206:4000/generate_image` into your web browser. To use this in your own GitHub readme, use the following link for a generated image that takes in the current timestamp as a parameter, as well as any other parameters you want:

`http://54.242.56.206:4000/generate_image?timestamp=<current_timestamp>`

## Query Parameters

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

These themes are based on gprm's GitHub readme stats themes. You can find the themes [here](https://gprm.itsvg.in/).

![Generated Image](http://54.242.56.206:4000/generate_image?timestamp=<current_timestamp>)