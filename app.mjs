import express from 'express';
const app = express();
import themes from "./theme/index.mjs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//methods
import {allQuotes, filter} from './methods/filter.mjs';
import {quoteToArray} from './methods/quoteArray.mjs';
import {generateTextSVG} from './methods/generateTextSVG.mjs';
import checkError from './methods/errorHandle.mjs';

// Font File Loading
const __dirname = dirname(fileURLToPath(import.meta.url));
const fontPathPhilosopher = path.join(__dirname, './assets/Philosopher-Italic.ttf');
const fontDataPhilosopher = fs.readFileSync(fontPathPhilosopher);
const base64Philosopher = Buffer.from(fontDataPhilosopher).toString('base64');
const fontPathRambla = path.join(__dirname, './assets/Rambla-Italic.ttf');
const fontDataRambla = fs.readFileSync(fontPathRambla);
const base64Rambla = Buffer.from(fontDataRambla).toString('base64');

app.get('/generate-image', async (req, res) => {
  let theme = req.query['theme'];
  let author = req.query['author'];
  let dailyQuote = req.query['daily-quote'];
  let quote = req.query['quote'];
  let includeIndexes = req.query['include-indexes'];
  let excludeIndexes = req.query['exclude-indexes'];

  let preFilterQuotes = await allQuotes();
  let returnedError = checkError(author, theme, dailyQuote, quote, includeIndexes, excludeIndexes, preFilterQuotes, res);
  if(returnedError !== null){
    return res.status(400).send(returnedError);
  }

  // Theme handling
  if (theme === undefined) theme = 'default';
  if (themes[theme] === undefined) return res.status(400).send('Invalid theme');
  let borderColor;
  if(themes[theme].border_color === undefined) borderColor = '000000';
  else borderColor = themes[theme].border_color;

  let quotes = await filter(preFilterQuotes, author, dailyQuote, quote, includeIndexes, excludeIndexes);
  let randomQuote = await quotes[Math.floor(Math.random() * quotes.length)];

  let xOffset = 400-randomQuote.author.length*10+10;
  if(randomQuote.author.length > 15){
    xOffset += 30;
  }
  else if(randomQuote.author.length < 8){
    xOffset -= 4;
  }

  let svgQuoteElements = generateTextSVG(quoteToArray(randomQuote.quote), randomQuote.quote, themes[theme].title_color);


      // Generate an SVG image
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250">
      <defs>
        <style type="text/css">
          @font-face {
            font-family: 'Philosopher Italic';
            src: url('data:font/truetype;charset=utf-8;base64,${base64Philosopher}') format('truetype');
          }
            @font-face {
                font-family: 'Rambla Italic';
                src: url('data:font/truetype;charset=utf-8;base64,${base64Rambla}') format('truetype');
            }
        </style>
      </defs>
      <rect width="${400}" height="${250}" style="fill:#${themes[theme].bg_color}" 
                rx="4.5" ry="4.5" x="0.5" y="0.5" stroke="#${borderColor}" stroke-opacity="1" />
      ${svgQuoteElements}
      <text x="${xOffset}" y="200" dominant-baseline="middle" text-anchor="middle" fill="#${themes[theme].text_color}"
      font-family="Rambla Italic" font-size="25">
          -${randomQuote.author}
        </text>
      <circle cx="52" cy="195" r="5" fill="#${themes[theme].icon_color}" />
      <circle cx="35" cy="225" r="5" fill="#${themes[theme].icon_color}"/>
      <circle cx="70" cy="225" r="5" fill="#${themes[theme].icon_color}"/>
      
    </svg>
  `;

  // <text x="100" y="100" dominant-baseline="middle" text-anchor="middle" fill="#000000"
  //       font-family="Philosopher Italic" font-size="20">${randomQuote.quote}</text>

  // Set the content type to image/svg+xml
  res.setHeader('Content-Type', 'image/svg+xml');

  // Send the SVG image in the response
  res.send(svg);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});