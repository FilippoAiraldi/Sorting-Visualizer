import React from 'react'
import './ToolBar.css'
import { CONSTS } from '../Constants.js';

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectRef: React.createRef(),
            isSorting: false
        };
    }

    sortingCompleted() {
        this.setState({
            selectRef: this.state.selectRef,
            isSorting: false
        });
    }

    render() {
        let idle = !this.state.isSorting;
        return (
            <div className="centered-item tool-bar">
                <label
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

                <label className="centered-item text-box">Sorting<br />algorithm</label>
                <select
                    name="sort-control"
                    ref={this.state.selectRef}
                    className="centered-item">
                    <option value="bubble_sort">Bubble sort</option>
                    <option value="cocktail_sort">Cocktail sort</option>
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
                    className={idle ? "sort-button" : "sort-button stop-button"}
                    onClick={() => {
                        if (idle) {
                            var e = this.state.selectRef.current;
                            this.props.startSortActivated(e.options[e.selectedIndex].value);
                        }
                        else {
                            this.props.stopSortActivated();
                        }

                        this.setState({
                            selectRef: this.state.selectRef,
                            isSorting: idle
                        });
                    }}>
                    <span>{idle ? "Start sorting" : "Stop"}</span>
                </button>
            </div>
        );
    }

}