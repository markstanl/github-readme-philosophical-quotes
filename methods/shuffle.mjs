const shuffle = (array, seed) => {

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

export default shuffle;
