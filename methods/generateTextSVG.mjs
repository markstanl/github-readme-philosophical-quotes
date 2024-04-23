

const generateTextSVG = (quoteArray, quote, color) => {
    let yPlacement = 100-(quoteArray.length*26)*0.5;
    if(quoteArray[1] === "gazelle") yPlacement+= 100;

    let svgQuoteElements = quoteArray.map((text, index) => {
        if (quote.length < 30) {
            return `<text x="200" y="${yPlacement + index * 38}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="38">${text}</text>`;
        } else if (quote.length < 50) {
            return `<text x="200" y="${yPlacement + index * 30}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="30">${text}</text>`;
        } else if (quote.length < 100) {
            return `<text x="200" y="${yPlacement + 5 + index * 28}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="28">${text}</text>`;
        } else if (quote.length < 150) {
            return `<text x="200" y="${yPlacement + 5 + index * 26}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="26">${text}</text>`;
        } else if (quote.length < 300) {
            return `<text x="200" y="${yPlacement + 10 + index * 20}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="20">${text}</text>`;
        } else {
            return `<text x="200" y="${yPlacement + index * 15}" dominant-baseline="middle" text-anchor="middle" fill="#${color}"
    font-family="Philosopher Italic" font-size="15">${text}</text>`;
        }
    }).join('');

    return svgQuoteElements;
}

export { generateTextSVG };