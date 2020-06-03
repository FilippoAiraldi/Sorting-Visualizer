
import { CONSTS, getBaseAnimationSpeed, updateAnimationSpeed } from '../Constants.js'

export async function invokeSortingAlgorithm(method, v) {
    // testAlgorithm(v); return;

    switch (method) {
        case "bubble_sort":
            await bubbleSort(v);
            break;
        case "cocktail_sort":
            await cocktailSort(v);
            break;
        case "selection_sort":
            await selectionSort(v);
            break;
        case "oddeven_sort":
            await oddEvenSort(v);
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
            await color(v, [i - 1, i], CONSTS.COMPARED_COLOR);

            if (v[i - 1].getHeight() > v[i].getHeight()) {
                swap(v, i - 1, i);
                unsorted = true;
                // color swapped bars
                await color(v, [i - 1, i], CONSTS.SWAPPED_COLOR);
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
    // initialize
    let N = v.length;
    let beginIdx = 0;
    let endIdx = N - 2;

    // start sorting
    while (beginIdx <= endIdx) {
        let newBeginIdx = endIdx;
        let newEndIdx = beginIdx;

        for (let i = beginIdx; i <= endIdx; ++i) {
            // check if a stop was requested
            if (checkStopRequest()) return;

            // color bars under comparison
            await color(v, [i, i + 1], CONSTS.COMPARED_COLOR);

            if (v[i].getHeight() > v[i + 1].getHeight()) {
                swap(v, i, i + 1);
                newEndIdx = i;
                // color swapped bars
                await color(v, [i, i + 1], CONSTS.SWAPPED_COLOR);
            }
        }
        endIdx = newEndIdx - 1;
        // color sorted bars (all after newEndIdx)
        await color(v, range(newEndIdx + 1, N), CONSTS.SORTED_COLOR, true);

        for (let i = endIdx; i >= beginIdx; --i) {
            // check if a stop was requested
            if (checkStopRequest()) return;

            // color bars under comparison
            await color(v, [i, i + 1], CONSTS.COMPARED_COLOR);

            if (v[i].getHeight() > v[i + 1].getHeight()) {
                swap(v, i, i + 1);
                newBeginIdx = i;
                // color swapped bars
                await color(v, [i, i + 1], CONSTS.SWAPPED_COLOR);
            }
        }
        beginIdx = newBeginIdx + 1;
        // color sorted bars (all before newBeginIdx)
        await color(v, range(0, newBeginIdx + 1), CONSTS.SORTED_COLOR, true);
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function selectionSort(v) {
    // initialize
    let N = v.length;

    // start looping
    for (let i = 0; i < N - 1; ++i) {
        let minIdx = i;
        for (let j = i + 1; j < N; ++j) {
            // check if a stop was requested
            if (checkStopRequest()) return;

            minIdx = v[j].getHeight() < v[minIdx].getHeight() ? j : minIdx;

            // color bars under comparison
            color(v, [minIdx, j], CONSTS.COMPARED_COLOR);
            // color bar that will be swapped (not really a pivot..)
            await color(v, [i], CONSTS.PIVOT_COLOR);
        }

        if (minIdx != i) {
            swap(v, i, minIdx);
            // color swapped bars
            await color(v, [i, minIdx], CONSTS.SWAPPED_COLOR);
        }

        // color sorted bar
        await color(v, [i], CONSTS.SORTED_COLOR, true);
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function oddEvenSort(v) {
    // initialize
    let N = v.length;
    let odd = false;
    let sorted = [false, false]; // one for even, one for odd

    // start looping; exit iff both even and odd sets are sorted 
    while (!sorted[0] || !sorted[1]) {
        let base = !odd ? 0 : 1;
        sorted[base] = true;
        odd = !odd

        for (let i = base; i < N - 1; i += 2) {
            // check if a stop was requested
            if (checkStopRequest()) return;

            // color bars under comparison
            await color(v, [i, i + 1], CONSTS.COMPARED_COLOR);

            if (v[i].getHeight() > v[i + 1].getHeight()) {
                swap(v, i, i + 1);
                sorted[base] = false;
                // color swapped bars
                await color(v, [i, i + 1], CONSTS.SWAPPED_COLOR);
            }
        }
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
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
    let tmp = v[a].getHeight();
    v[a].setHeight(v[b].getHeight());
    v[b].setHeight(tmp);
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

function range(start, end) {
    // end not inclusive
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

function testAlgorithm(v) {
    console.log("Testing sorting algorithm:");

    let array = v.map(b => b.getHeight())
    var test1 = array.slice();
    var test2 = array.slice();

    // sort with custom function
    // selectionSort(test1);

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
