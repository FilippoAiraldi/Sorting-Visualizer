
import { CONSTS, getAnimationSpeedMultiplier, getBaseAnimationSpeed } from '../Constants.js'

export async function invokeSortingAlgorithm(method, v) {
    switch (method) {
        case "bubble_sort":
            await bubbleSort(v);
            break;
        default:
            break;
    }
}

async function bubbleSort(v) {
    // get animation speed
    let speed = getBaseAnimationSpeed(v.length);
    let updatedSpeed = updateAnimationSpeed(speed);

    // initialize
    let N = v.length;
    let unsorted;

    // start looping
    do {
        unsorted = false;
        for (let i = 1; i < N; ++i) {
            // update animation speed from UI
            updatedSpeed = updateAnimationSpeed(speed);

            // color bars under comparison
            await color(v, [i - 1, i], CONSTS.COMPARED_COLOR, updatedSpeed, false);

            if (v[i - 1].getHeight() > v[i].getHeight()) {
                // color swapped bars
                await color(v, [i - 1, i], CONSTS.SWAPPED_COLOR, updatedSpeed, false);
                swap(v, i - 1, i);
                unsorted = true;
            }
        }
        N--;
        // color sorted bar (always last one pointed by N)
        await color(v, [N], CONSTS.SORTED_COLOR, updatedSpeed, true);
    }
    while (unsorted);

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));

    /*  ORIGINAL BUBBLE SORT
    let N = v.length;
    let unsorted;
    do {
        unsorted = false;
        for (let i = 1; i < N; ++i) {
            if (v[i - 1] > v[i]) {
                swap(v, i - 1, i);
                unsorted = true;
            }
        }
        N--;
    }
    while (unsorted); */
}

function updateAnimationSpeed(baseInterval) {
    let multiplier = 1;
    let speedControl = document.getElementsByName("speed-control")[0];
    if (speedControl !== undefined) {
        multiplier = getAnimationSpeedMultiplier(speedControl.valueAsNumber);
        if (multiplier <= 0) {
            multiplier = 1;
        }
    }
    return baseInterval / multiplier;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(v, a, b) {
    let tmp = v[a].getHeight();
    v[a].setHeight(v[b].getHeight());
    v[b].setHeight(tmp);
}

async function color(v, indeces, color, interval, permanent = false) {
    // if permant, just apply the new color, wait and return
    if (permanent) {
        indeces.forEach(i => {
            v[i].setColor(color);
        });
        await sleep(interval);
    }
    // if not permant, save previous color, wait, reapply previous color, and return
    else {
        let old_colors = indeces.map(i => v[i].getColor());
        indeces.forEach(i => {
            v[i].setColor(color);
        });
        await sleep(interval);
        indeces.forEach((i, j) => {
            v[i].setColor(old_colors[j]);
        });
    }
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



