import React from 'react'
import './ToolBar.css'

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.SelectRef = React.createRef();
    }

    render() {
        const min = 5;
        const max = 250;

        return (
            <div className="centered-item tool-bar">
                <label className="centered-item text-box">Number of elements</label>
                <input
                    type="range"
                    min={min}
                    max={max}
                    defaultValue={(max + min) / 2} /* acts as initial value */
                    onChange={(e) => this.props.handleRangeChanged(e.target.value)} />

                <div className="separator" />

                <label className="centered-item text-box">Algorithm</label>
                <select
                    ref={this.SelectRef}
                    className="centered-item">
                    <option value="bubble_sort">Bubble sort</option>
                    <option value="merge_sort">Merge sort</option>
                </select>

                <div className="separator" />

                <button
                    className="button"
                    onClick={() => {
                        var e = this.SelectRef.current;
                        this.props.startSortActivated(e.options[e.selectedIndex].value);
                    }}>
                    <span>Start sorting</span>
                </button>
            </div>
        );
    }

}