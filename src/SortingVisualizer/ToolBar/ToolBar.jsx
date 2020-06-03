import React from 'react'
import './ToolBar.css'
import { CONSTS } from '../Constants.js';

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.SelectRef = React.createRef();
    }

    render() {
        return (
            <div className="centered-item tool-bar">
                <label
                    style={{ textAlign: "center" }}
                    className="centered-item text-box">
                    Number<br />of elements
                </label>
                <input
                    name="sort-control"
                    type="range"
                    style={{ width: "100px" }}
                    min={CONSTS.MIN_BARS}
                    max={CONSTS.MAX_BARS}
                    defaultValue={CONSTS.INIT_BARS}
                    onChange={(e) => this.props.handleRangeChanged(e.target.value)} />

                <div className="separator" />


                <label className="centered-item text-box">Algorithm</label>
                <select
                    name="sort-control"
                    ref={this.SelectRef}
                    className="centered-item">
                    <option value="bubble_sort">Bubble sort</option>
                    <option value="merge_sort">Merge sort</option>
                </select>

                <div className="separator" />

                <label
                    style={{ textAlign: "center" }}
                    className="centered-item text-box">
                    Animation<br />speed
                </label>
                <input
                    name="speed-control"
                    type="range"
                    style={{ width: "100px" }}
                    min={CONSTS.MIN_ANIMATION_SPEED}
                    max={CONSTS.MAX_ANIMATION_SPEED}
                    defaultValue={CONSTS.INIT_ANIMATION_SPEED} />

                <div className="separator" />

                <button
                    name="sort-control"
                    className="sort-button"
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