export const genRandomUniqueNumbers = (limit) => {
    //we need to store these numbers somewhere
    const array = [];
    //how many times we added a valid number (for if statement later)
    let counter = limit - 4;

    //we will be generating random numbers until we are satisfied
    while (true) {

        //create that number
        const newRandomNumber = Math.floor(Math.random() * limit);

        //if we do not have this number in our array, we will add it
        if (!array.includes(newRandomNumber)) {
            array.push(newRandomNumber);
            counter++;
        }

        //if we have enought of numbers, we do not need to generate them anymore
        if (counter >= limit) {
            break;
        }
    }

    //now hand over this stuff
    return array;
};


export const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};