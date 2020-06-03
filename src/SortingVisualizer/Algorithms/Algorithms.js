
import { CONSTS, getBaseAnimationSpeed, updateAnimationSpeed } from '../Constants.js'

export async function invokeSortingAlgorithm(method, v) {
    testAlgorithm(v); return;

    switch (method) {
        case "bubble_sort":
            await bubbleSort(v);
            break;
        case "cocktail_sort":
            await cocktailSort(v);
            break;
        default:
            break;
    }
}

async function bubbleSort(v) {
    // initialize
    let N = v.length;
    let unsorted;

    // start looping
    do {
        unsorted = false;
        for (let i = 1; i < N; ++i) {
            // check if a stop was requested
            if (checkStopRequest()) return;

            // color bars under comparison
            await color(v, [i - 1, i], CONSTS.COMPARED_COLOR, false);

            if (v[i - 1].getHeight() > v[i].getHeight()) {
                // color swapped bars
                await color(v, [i - 1, i], CONSTS.SWAPPED_COLOR, false);
                swap(v, i - 1, i);
                unsorted = true;
            }
        }
        N--;
        // color sorted bar (always last one pointed by N)
        await color(v, [N], CONSTS.SORTED_COLOR, true);
    }
    while (unsorted);

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function cocktailSort(v) {
    let N = v.length;
    let beginIdx = 0;
    let endIdx = N - 2;
    while (beginIdx <= endIdx) {
        let newBeginIdx = endIdx;
        let newEndIdx = beginIdx;
        for (let i = beginIdx; i <= endIdx; ++i) {
            if (v[i] > v[i + 1]) {
                swap(v, i, i + 1);
                newEndIdx = i;
            }
        }
        endIdx = newEndIdx - 1;
        for (let i = endIdx; i <= beginIdx; --i) {
            if (v[i] > v[i + 1]) {
                swap(v, i, i + 1);
                newBeginIdx = i;
            }
        }
        beginIdx = newBeginIdx - 1;
    }
}

let _forceStop = false;
export function forceStop() {
    _forceStop = true;
}

function checkStopRequest() {
    if (_forceStop) {
        _forceStop = false;
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(v, a, b) {
    /* let tmp = v[a].getHeight();
    v[a].setHeight(v[b].getHeight());
    v[b].setHeight(tmp); */

    let tmp = v[a];
    v[a] = v[b];
    v[b] = tmp;
}

async function color(v, indeces, color, permanent = false) {
    // get the speed and its multiplier
    let interval = updateAnimationSpeed(getBaseAnimationSpeed(v.length));

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

function testAlgorithm(v) {
    console.log("Testing sorting algorithm:");

    let array = v.map(b => b.getHeight())
    var test1 = array.slice();
    var test2 = array.slice();

    // sort with custom function
    cocktailSort(test1);

    // sort with built-in function
    test2.sort((a, b) => a > b);

    console.log("original: " + array);
    console.log("my sort: " + test1);
    console.log("js sort: " + test2);

    // compare arrays
    for (let i = 0; i < test1.length; ++i) {
        if (test1[i] !== test2[i]) {
            console.log("test failed");
            return;
        }
    }
    console.log("test succeeded");
}
