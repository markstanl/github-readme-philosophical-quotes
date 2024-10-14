import themes from "../theme/index.mjs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
//methods
import {allQuotes, filter} from '../methods/filter.mjs';
import {quoteToArray} from '../methods/quoteArray.mjs';
import {generateTextSVG} from '../methods/generateTextSVG.mjs';
import checkError from '../methods/errorHandle.mjs';

//font file loading
const dirName = dirname(fileURLToPath(import.meta.url));
const fontPathPhilosopher = path.join(dirName, '../assets/Philosopher-Italic.ttf');
const fontDataPhilosopher = fs.readFileSync(fontPathPhilosopher);
const base64Philosopher = Buffer.from(fontDataPhilosopher).toString('base64');
const fontPathRambla = path.join(dirName, '../assets/Rambla-Italic.ttf');
const fontDataRambla = fs.readFileSync(fontPathRambla);
const base64Rambla = Buffer.from(fontDataRambla).toString('base64');


export default async (req, res) => {
    cors()(req, res, async () => {
        let theme = req.query['theme'];
        let author = req.query['author'];
        let dailyQuote = req.query['daily-quote'];
        let quote = req.query['quote'];
        let includeIDs = req.query['include-ids'];
        let excludeIDs = req.query['exclude-ids'];
        let dailySeed = req.query['daily-seed'];

        let preFilterQuotes = await allQuotes();
        let returnedError = checkError(author, theme, dailyQuote, quote, includeIDs, excludeIDs, preFilterQuotes, dailySeed);
        if (returnedError !== null) {
            return res.status(400).send(returnedError);
        }
        if(dailySeed !== undefined) dailySeed = parseInt(dailySeed);

        // Theme handling
        if (theme === undefined) theme = 'default';
        if (themes[theme] === undefined) return res.status(400).send('Invalid theme');
        let borderColor;
        if (themes[theme].border_color === undefined) borderColor = 'ffffff';
        else borderColor = themes[theme].border_color;

        let quotes = await filter(preFilterQuotes, author, dailyQuote, quote, includeIDs, excludeIDs, dailySeed);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        let xOffset = 400 - randomQuote.author.length * 10 + 10;
        if (randomQuote.author.length > 15) {
            xOffset += 30;
        } else if (randomQuote.author.length < 8) {
            xOffset -= 4;
        }

        let svgQuoteElements = generateTextSVG(quoteToArray(randomQuote.quote), randomQuote.quote, themes[theme].title_color);


        // Generate an SVG image
        const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250">
      <defs>
          <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#4158d0"/>
            <stop offset="50%" stop-color="#c850c0"/>
            <stop offset="100%" stop-color="#ffcc70"/>
          </linearGradient>
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
      <rect width="${400 - 1}" height="${250 - 1}" style="fill:#${themes[theme].bg_color}"
      rx="4.5" ry="4.5" x="${0.5 + 0.5}" y="${0.5 + 0.5}" stroke="#${borderColor}" stroke-opacity="1" />
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

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache, max-age=0');

        res.send(svg);
    });
};