import React from 'react'
import ArrayBar from './ArrayBar'
import { CONSTS } from '../Constants.js';
import { invokeSortingAlgorithm, forceStop } from '../Algorithms/Algorithms.js';
import './Body.css'

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            numberOfBars: CONSTS.INIT_BARS
        };

        // an array of refs to each bar
        this.barsRefs = new Array(CONSTS.MAX_BARS);
    }

    componentDidMount() {
        // basically triggers the first rendering of the bars
        this.setNumberOfBars(this.state.numberOfBars)
    }

    setNumberOfBars(n) {
        this.setState({
            array: this.generateBars(n),
            numberOfBars: n
        });
    }

    generateBars(n) {
        let arr = [];
        for (let i = 0; i < n; ++i)
            arr.push(Math.roundToDigit(Math.randomFromInterval(1, 100), 2));
        return arr;
    }

    stopSorting() {
        forceStop();
    }

    async sortArray(method) {
        // disable sorting controls
        let controls = document.getElementsByName("sort-control");
        controls.forEach(c => c.disabled = true);

        // call the sorting algorithm (after filtering out null refs) 
        // corresponding to the method and wait for it to finish
        let v = this.barsRefs.filter(ref => ref !== null);
        if (v.length > 1) {
            // color all bars as unsorted
            v.forEach(b => b.setColor(CONSTS.STANDARD_COLOR));

            // proceed with sorting
            await invokeSortingAlgorithm(method, v);
        }

        // enable sorting controls
        controls.forEach(c => c.disabled = false);

        // fire that sorting is over
        this.props.sortingCompleted();
    }

    render() {
        // reset colors for all bars (that aren't null)
        this.barsRefs.filter(r => r !== null).forEach(b => b.setColor(CONSTS.STANDARD_COLOR));

        // compute width of each bar
        const w = 100 / this.state.numberOfBars;

        // render bars
        return (
            <div className="array-container">
                {
                    this.state.array.map((h, i) => (
                        <ArrayBar
                            key={i}
                            height={h}
                            width={w}
                            ref={(instance) => { this.barsRefs[i] = instance }}
                        />
                    ))
                }
            </div>
        );
    }
}

Math.randomFromInterval = function (min, max) {
    // min and max inclusive
    return (Math.random() * (max - min + 1) + min);
}

Math.roundToDigit = function (x, n) {
    const multipler = Math.pow(10, n);
    return Math.round(x * multipler) / multipler;
}