export function invokeSortingAlgorithm(method, array) {
    if (array.length <= 1)
        return [];

    switch (method) {
        case "bubble_sort":
            return bubbleSort(array);
        default:
            return [];
    }
}

/* Animation = function () {
    this.compared = []; // array of indeces of bars under comparison
    this.swapped = [];  // array of (2) bars indeces to be swapped
    this.sorted = [];   // non-cumulative array of sorted bars indeces    
    this.pivot = [];    // array of (1) bars indeces acting as pivot
} */

function bubbleSort(v) {
    /* WHAT ABOUT A SPECIAL DIV(INHERITED) THAT ACCEPTS NEW CSS
    SELECTORS LIKE: SORTED, : COMPARED, ETC., EACH OF WHICH WITH
    ITS COLORING SCHEME */



    return [];

    let animations = [];
    let N = v.length;
    let swapped;

    do {
        // initialize new animation and 
        // suppose we are not gonna swap anything
        let a = new Animation();
        swapped = false;
        for (let i = 1; i < N; ++i) {
            // add the 2 bars under comparison to the animation
            a.compared.push(i - 1);
            a.compared.push(i);

            // check if compared bars must be swapped
            if (v[i - 1] > v[i]) {
                // add compared bars to swapped in the animation
                a.swap.push()

                // actually swap the bar heights
                swap(v, i - 1, i);
                swapped = true;
            }
        }
        N--;

        animations.push(a);
    }
    while (swapped);

    return animations;
}

function swap(array, a, b) {
    let tmp = array[a];
    array[a] = array[b];
    array[b] = tmp;
}

/* function testAlgorithm(method, array) {
    var test1 = array.slice();
    var test2 = array.slice();

    // sort with custom function
    // bubbleSort(test1);

    // sort with built-in function
    test2.sort((a, b) => a > b);

    console.log("original: " + array);
    console.log("my sort: " + test1);
    console.log("js sort: " + test2);

    // compare arrays
    for (let i = 0; i < test1.length; ++i) {
        if (test1[i] !== test2[i])
            return false;
    }
    return true;
} */



/* const barOneStyle = arrayBars[0].style;
    barOneStyle.backgroundColor = "red"; */

    // get bars styles from Body, bars height array, and corresponding length
/* let bars = Array.from(document.getElementsByClassName("array-bar")).map(b => b.style);
let v = bars.map(b => parseFloat(b.height));
let n = v.length;

colorBars(bars, [1, 2, 3], "red", true);
sleep(ANIMATION_SPEED);
colorBars(bars, [4, 5, 6], "yellow", true); */


/* function colorBars(bars, indeces, color, permanent = false) {
    // bars - Array of bars styles
    // indeces - Array of indeces of bars to modify
    // color - New color as string
    // permanent - Flag if color is permanent
    indeces.forEach(i => bars[i].backgroundColor = color);
    if (!permanent)
        setTimeout(() => indeces.forEach(i => bars[i].backgroundColor = STD_COLOR), ANIMATION_SPEED);
}

function swap(bars, heights, x, y) {
    // bars - Array of bars styles
    // heights - Array of bars heights
    // x - First index of the swapping
    // y - Second index of the swapping

    // swap heights array
    let tmp = heights[x];
    heights[x] = heights[y];
    heights[y] = tmp;

    // swap bars styles array (just backgroundColor and height)
    let tmpClr = bars[x].backgroundColor;
    let tmpH = bars[x].height;
    bars[x].backgroundColor = bars[y].backgroundColor;
    bars[x].height = bars[y].height;
    bars[y].backgroundColor = tmpClr;
    bars[y].height = tmpH;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
} */