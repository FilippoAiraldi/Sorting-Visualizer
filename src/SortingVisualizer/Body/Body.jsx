import React from 'react'
import './Body.css'

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = { array: [], numberOfBars: 100 };
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
        var arr = [];
        for (let i = 0; i < n; ++i)
            arr.push(Math.roundToDigit(Math.randomFromInterval(1, 100), 2));
        return arr;
    }

    sortArray(method) {
        const copy = this.state.array.slice();

        // js built-in function
        const sorted = copy.sort((a, b) => a > b);

        /* this.setState({
            array: sorted,
            numberOfBars: this.state.numberOfBars
        }); */
    }

    render() {
        const w = 100 / this.state.numberOfBars;
        return (
            <div className="array-container">
                {
                    this.state.array.map((h, i) => (
                        <div
                            key={i}
                            className="array-bar"
                            style={{ height: `${h}%`, width: `${w}%` }} />))
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