
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
        case "oddeven_sort":
            await oddEvenSort(v);
            break;
        case "comb_sort":
            await combSort(v);
            break;
        case "selection_sort":
            await selectionSort(v);
            break;
        case "insertion_sort":
            await insertionSort(v);
            break;
        case "gnome_sort":
            await gnomeSort(v);
            break;
        case "cycle_sort":
            await cycleSort(v);
            break;
        case "sheel_sort":
            await shellSort(v);
            break;
        case "tree_sort":
            await treeSort(v);
            break;
        case "bogo_sort":
            await bogoSort(v);
            break;
        case "slow_sort":
            await slowSort(v);
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
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

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
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

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
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

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
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

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

async function combSort(v) {
    // initialize
    let N = v.length;
    let gap = N;
    let shrink = 1.3;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        let i = 0;
        while (i + gap < N) {
            // check if a stop was requested
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

            // color bars under comparison
            await color(v, [i, i + gap], CONSTS.COMPARED_COLOR);

            if (v[i].getHeight() > v[i + gap].getHeight()) {
                swap(v, i, i + gap);
                sorted = false;
                // color swapped bars
                await color(v, [i, i + gap], CONSTS.SWAPPED_COLOR);
            }
            i++;
        }
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
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

            minIdx = v[j].getHeight() < v[minIdx].getHeight() ? j : minIdx;

            // color bars under comparison
            color(v, [minIdx, j], CONSTS.COMPARED_COLOR);
            // color bar that will be swapped (not really a pivot..)
            await color(v, [i], CONSTS.PIVOT_COLOR);
        }

        if (minIdx !== i) {
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

async function insertionSort(v) {
    // initialize
    let N = v.length;
    color(v, [0], CONSTS.SORTED_COLOR, true);

    // start looping
    for (let i = 1; i < N; ++i) {
        let tmp = v[i].getHeight();
        let j = i - 1;

        while (j >= 0 && v[j].getHeight() > tmp) {
            // check if a stop was requested
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

            // color bar that will be inserted (not really a pivot..)
            color(v, [i], CONSTS.PIVOT_COLOR);
            // color moving bar under comparison
            await color(v, [j], CONSTS.COMPARED_COLOR);

            v[j + 1].setHeight(v[j].getHeight());
            j--;
        }

        v[j + 1].setHeight(tmp);

        // color swapped bars
        await color(v, [j + 1, i], CONSTS.SWAPPED_COLOR);

        // color sorted bar
        await color(v, [i], CONSTS.SORTED_COLOR, true);
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function gnomeSort(v) {
    // initialize 
    let N = v.length;
    let i = 0;
    let max_i = 0;

    // start looping
    while (i < N) {
        // check if a stop was requested
        if (stopRequest.isRequested) {
            stopRequest.requestHandled();
            return;
        }

        max_i = Math.max(max_i, i);
        // color sorted bar
        color(v, [max_i], CONSTS.SORTED_COLOR, true);
        // color moving bar under comparison
        await color(v, [i], CONSTS.COMPARED_COLOR);

        if (i === 0 || v[i].getHeight() >= v[i - 1].getHeight()) {
            i++;
        }
        else {
            swap(v, i - 1, i);
            i--;
        }
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function cycleSort(v) {
    // initialize 
    let N = v.length;

    for (let i = 0; i < N - 1; ++i) {
        let h = v[i].getHeight();

        let p = i;
        for (let j = i + 1; j < N; ++j) {
            // check if a stop was requested
            if (stopRequest.isRequested) {
                stopRequest.requestHandled();
                return;
            }

            // color moving bar under comparison (+ 1 avoids problems with colors overlapping)
            color(v, [p + 1, j], CONSTS.COMPARED_COLOR);
            // color bar that will be counted (not really a pivot..)
            await color(v, [i], CONSTS.PIVOT_COLOR);

            if (v[j].getHeight() < h) {
                p++;
            }
        }

        if (p === i) continue;

        while (h === v[p].getHeight()) p++;

        let tmp = v[p].getHeight();
        v[p].setHeight(h);
        h = tmp;
        // color swapped bars
        await color(v, [i, p], CONSTS.SWAPPED_COLOR);
        // color sorted bar
        color(v, [p], CONSTS.SORTED_COLOR, true);

        while (p !== i) {
            p = i;
            for (let j = i + 1; j < N; ++j) {
                // check if a stop was requested
                if (stopRequest.isRequested) {
                    stopRequest.requestHandled();
                    return;
                }
                // color moving bar under comparison (+ 1 avoids problems with colors overlapping)
                color(v, [p + 1, j], CONSTS.COMPARED_COLOR);
                // color bar that will be counted (not really a pivot..)
                await color(v, [i], CONSTS.PIVOT_COLOR);

                if (v[j].getHeight() < h) {
                    p++;
                }
            }

            while (h === v[p].getHeight()) p++;

            tmp = v[p].getHeight();
            v[p].setHeight(h);
            h = tmp;
            // color swapped bars
            await color(v, [i, p], CONSTS.SWAPPED_COLOR);
            // color sorted bar
            color(v, [p], CONSTS.SORTED_COLOR, true);
        }
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function shellSort(v) {
    // initialize
    let N = v.length;

    // compute optimal gaps
    let gaps = [1];
    for (let i = 2; gaps.last() <= N; ++i) {
        gaps.push(Math.round(0.8552601 * Math.exp(0.8386519 * i) - 0.5908367));
    }
    gaps.reverse();

    for (const gap of gaps) {
        for (let i = gap; i < N; ++i) {
            // color base bar
            await color(v, [i], CONSTS.PIVOT_COLOR, true);

            let tmp = v[i].getHeight();
            let j;
            for (j = i; j >= gap && v[j - gap].getHeight() > tmp; j -= gap) {
                // check if a stop was requested
                if (stopRequest.isRequested) {
                    stopRequest.requestHandled();
                    return;
                }

                // color moving bar under comparison
                await color(v, [j], CONSTS.COMPARED_COLOR);
                v[j].setHeight(v[j - gap].getHeight());
            }

            // color modified bar
            if (gap !== 1) {
                await color(v, [j], CONSTS.SWAPPED_COLOR);
            } else {
                await color(v, range(0, j + 1), CONSTS.SORTED_COLOR, true);
            }
            v[j].setHeight(tmp);

            // color base bar back to normal
            color(v, [i], CONSTS.STANDARD_COLOR, true);
        }
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function treeSort(v) {
    class Node {
        constructor(x, idx) {
            this.val = x;
            this.barIdx = idx;
            this.left = null;
            this.right = null;
        }
    }

    async function insert(node, val, idx) {
        // color bar that has to be inserted
        await color(v, [node.barIdx], CONSTS.COMPARED_COLOR);

        if (val < node.val) {
            if (node.left === null) {
                // color bar that has been finally inserted
                await color(v, [node.barIdx], CONSTS.SWAPPED_COLOR);
                node.left = new Node(val, idx);
            }
            else
                await insert(node.left, val, idx);
        }
        else {
            if (node.right === null) {
                // color bar that has been finally inserted
                await color(v, [node.barIdx], CONSTS.SWAPPED_COLOR);
                node.right = new Node(val, idx);
            }
            else
                await insert(node.right, val, idx);
        }
    }

    let sortedIdx = 0;
    async function inOrderTraversal(node) {
        // check if a stop was requested
        if (stopRequest.isRequested) return;
        // in this case, the request is not handled as it is 
        // embedded in a recursive function. It will be handled
        // at the end of the calling function.

        if (node === null) return;
        await inOrderTraversal(node.left);

        v[sortedIdx].setHeight(node.val);
        // color sorted bar
        await color(v, [sortedIdx++], CONSTS.SORTED_COLOR, true);

        await inOrderTraversal(node.right);
    }

    // initialize root
    let root = new Node(v[0].getHeight(), 0);
    let h = v.map(b => b.getHeight());

    // add each height to the binary tree
    for (let i = 1; i < v.length; ++i) {
        // check if a stop was requested
        if (stopRequest.isRequested) {
            stopRequest.requestHandled();
            return;
        }

        // color bar to be inserted 
        await color(v, [i], CONSTS.PIVOT_COLOR, true);

        // actually insert the bar
        await insert(root, h[i], i);

        // restore color of inserted bar
        color(v, [i], CONSTS.STANDARD_COLOR, true);
    }

    // traverse tree in order
    await inOrderTraversal(root);

    // check for unhandled stop requests
    if (stopRequest.isRequested) {
        stopRequest.requestHandled();
        return;
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function bogoSort(v) {
    function shuffle(v) {
        for (let i = v.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // [a[i], a[j]] = [a[j], a[i]];
            swap(v, i, j);
        }
    }

    function isSorted(v) {
        for (let i = 0; i < v.length - 1; ++i) {
            if (v[i].getHeight() > v[i + 1].getHeight()) {
                return false;
            }
        }
        return true;
    }
    console.log(isSorted(v))

    while (!isSorted(v)) {
        // check if a stop was requested
        if (stopRequest.isRequested) {
            stopRequest.requestHandled();
            return;
        }
        await sleep(500);
        shuffle(v);
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}

async function slowSort(v) {
    async function slowSortHelper(v, i, j) {
        // check if a stop was requested
        if (stopRequest.isRequested) return;
        // in this case, the request is not handled as it is 
        // embedded in a recursive function. It will be handled
        // at the end of the calling function.

        if (i >= j)
            return;

        let m = Math.floor((i + j) / 2);
        // color limit bars
        color(v, [m], CONSTS.COMPARED_COLOR);
        await color(v, [i, j], CONSTS.PIVOT_COLOR);

        // recursively call function on subarrays
        await slowSortHelper(v, i, m);
        await slowSortHelper(v, m + 1, j);

        // color limit bars
        await color(v, [i, m, j], CONSTS.SORTED_COLOR, true);

        if (v[m].getHeight() > v[j].getHeight()) {
            // color swapped bars
            await color(v, [m, j], CONSTS.SWAPPED_COLOR);
            swap(v, j, m);
        }

        await slowSortHelper(v, i, j - 1);
    }

    await slowSortHelper(v, 0, v.length - 1);

    // check for unhandled stop requests
    if (stopRequest.isRequested) {
        stopRequest.requestHandled();
        return;
    }

    // color all bars as sorted
    v.forEach(b => b.setColor(CONSTS.SORTED_COLOR));
}



let stopRequest = {
    isRequested: false,
    requestStop() { this.isRequested = true; },
    requestHandled() { this.isRequested = false; },
};

export function forceStop() {
    stopRequest.requestStop();
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

    // filter out eventual out-of-bounds indeces 
    let N = v.length;
    indeces = indeces.filter(i => i >= 0 && i < N);

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

Array.prototype.last = function () {
    return this[this.length - 1];
};
