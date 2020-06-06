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

                    <optgroup label="Exchanging">
                        <option value="bubble_sort">Bubble sort</option>
                        <option value="cocktail_sort">Cocktail sort</option>
                        <option value="oddeven_sort">Odd-even sort</option>
                        <option value="gnome_sort">Gnome sort</option>
                        <option value="comb_sort">Comb sort</option>
                    </optgroup>
                    <option style={{ fontSize: "1pt" }} disabled={true}>&nbsp;</option>

                    <optgroup label="Insertion">
                        <option value="insertion_sort">Insertion sort</option>
                        <option value="cycle_sort">Cycle sort</option>
                        <option value="sheel_sort">Shellsort</option>
                        <option value="tree_sort">Tree sort</option>
                    </optgroup>
                    <option style={{ fontSize: "1pt" }} disabled={true}>&nbsp;</option>

                    <optgroup label="Selection">
                        <option value="selection_sort">Selection sort</option>
                        <option value="heap_sort">Heap sort</option>
                        <option value="strand_sort">Strand sort</option>
                    </optgroup>
                    <option style={{ fontSize: "1pt" }} disabled={true}>&nbsp;</option>

                    <optgroup label="Non-comparison">
                        <option value="pigeonhole_sort">Pigeonhole sort</option>
                    </optgroup>
                    <option style={{ fontSize: "1pt" }} disabled={true}>&nbsp;</option>

                    <optgroup label="Other">
                        <option value="bogo_sort">Bogosort</option>
                        <option value="slow_sort">Slowsort</option>
                        <option value="stooge_sort">Stooge sort</option>
                        <option value="bead_sort">Bead sort</option>
                        <option value="pancake_sort">Pancake sort</option>
                    </optgroup>
                </select>

                <button
                    className="info-button"
                    onClick={() => {
                        let url;
                        let e = this.state.selectRef.current;
                        switch (e.options[e.selectedIndex].value) {
                            case "bubble_sort":
                                url = "https://en.wikipedia.org/wiki/Bubble_sort";
                                break;
                            case "cocktail_sort":
                                url = "https://en.wikipedia.org/wiki/Cocktail_shaker_sort";
                                break;
                            case "oddeven_sort":
                                url = "https://en.wikipedia.org/wiki/Odd%E2%80%93even_sort";
                                break;
                            case "comb_sort":
                                url = "https://en.wikipedia.org/wiki/Comb_sort";
                                break;
                            case "selection_sort":
                                url = "https://en.wikipedia.org/wiki/Selection_sort";
                                break;
                            case "insertion_sort":
                                url = "https://en.wikipedia.org/wiki/Insertion_sort";
                                break;
                            case "gnome_sort":
                                url = "https://en.wikipedia.org/wiki/Gnome_sort";
                                break;
                            case "cycle_sort":
                                url = "https://en.wikipedia.org/wiki/Cycle_sort";
                                break;
                            case "sheel_sort":
                                url = "https://en.wikipedia.org/wiki/Shellsort";
                                break;
                            case "tree_sort":
                                url = "https://en.wikipedia.org/wiki/Tree_sort";
                                break;
                            case "bogo_sort":
                                url = "https://en.wikipedia.org/wiki/Bogosort";
                                break;
                            case "slow_sort":
                                url = "https://en.wikipedia.org/wiki/Slowsort";
                                break;
                            case "heap_sort":
                                url = "https://en.wikipedia.org/wiki/Heapsort";
                                break;
                            case "strand_sort":
                                url = "https://en.wikipedia.org/wiki/Strand_sort";
                                break;
                            case "stooge_sort":
                                url = "https://en.wikipedia.org/wiki/Stooge_sort";
                                break;
                            case "bead_sort":
                                url = "https://en.wikipedia.org/wiki/Bead_sort";
                                break;
                            case "pancake_sort":
                                url = "https://en.wikipedia.org/wiki/Pancake_sorting";
                                break;
                            case "pigeonhole_sort":
                                url = "https://en.wikipedia.org/wiki/Pigeonhole_sort";
                                break;
                            default:
                                break;
                        }
                        if (url) window.open(url);
                    }}>
                    ?
                </button>

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
                            let e = this.state.selectRef.current;
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