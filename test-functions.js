function randomArray() {
    let array = [];
    let maxArrayLength = 100;
    let minArrayLength = 10;
    let arrayLength = Math.floor(Math.random() * (maxArrayLength - minArrayLength + 1) + minArrayLength);
    for (let i=0; i<arrayLength; i++) {
        let item = Math.floor(Math.random() * 100)
        array.push(item)
    }
    return array;
}

export {randomArray}