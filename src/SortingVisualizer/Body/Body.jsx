import React from 'react'
// import ArrayBar from './ArrayBar'
import { invokeSortingAlgorithm } from '../Algorithms/Algorithms.js';
import './Body.css'

/* const STANDARD_COLOR = "#2c32e0";   // standard color for a bar
const COMPARED_COLOR = "turquoise"; // color of bars under comparison
const SWAPPED_COLOR = "darkred";    // color of swapped bars
const SORTED_COLOR = "purple";      // color of sorted bars
const PIVOT_COLOR = "green";        // color of bars acting as pivots
let ANIMATION_SPEED = 10;           // in ms */

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            numberOfBars: 100
        };
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

    sortArray(method) {
        // get all array bars
        // let bars = document.getElementsByName("whsss");
        const bars = document.getElementsByTagName("ArrayBar");
        console.log(bars)

        /* // get animations for the selected algorithm
        let animations = invokeSortingAlgorithm(method, this.state.array.slice());

        // calculate animation speed
        ANIMATION_SPEED = 5000; */
    }

    render() {
        const w = 100 / this.state.numberOfBars;
        return (
            <div className="array-container">
                {
                    this.state.array.map((h, i) => (
                        /* <ArrayBar
                            className="array-bar"
                            index={i}
                            height={h}
                            width={w} /> */
                        <div
                            className="array-bar"
                            key={i}
                            style={{
                                height: `${this.props.height}%`,
                                width: `${this.props.width}%`
                            }}
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