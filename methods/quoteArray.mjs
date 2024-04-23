
export const quoteToArray = (quote) =>{
    let splitQuote = quote.split(" ");
    let quoteArray = [];
    let currentLine = "";
    if(quote.length < 35){
        while(splitQuote.length > 0){
            if(currentLine.length + splitQuote[0].length < 20){
                currentLine += splitQuote.shift() + " ";
            }else{
                quoteArray.push(currentLine);
                currentLine = "";
            }
        }
    }
    else if(quote.length < 150){
        while (splitQuote.length > 0) {
            if (currentLine.length + splitQuote[0].length < 30) {
                currentLine += splitQuote.shift() + " ";
            } else {
                quoteArray.push(currentLine);
                currentLine = "";
            }
        }
    }else {
        while (splitQuote.length > 0) {
            if (currentLine.length + splitQuote[0].length < 40) {
                currentLine += splitQuote.shift() + " ";
            } else {
                quoteArray.push(currentLine);
                currentLine = "";
            }
        }
    }
    quoteArray.push(currentLine);

    return quoteArray;


}

//quoteToArray("Those who educate children well are more to be honored than they who produce them; for these only gave them life, those the art of living well.")
