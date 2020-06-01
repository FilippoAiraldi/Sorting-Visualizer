import React from 'react'
import './SortingVisualizer.css'
import Body from './Body/Body'
import ToolBar from './ToolBar/ToolBar'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.BodyRef = React.createRef();
    }

    render() {
        var ratio = 90; // [0 - 100]
        return (
            <div className="main-window">
                <div style={{ height: `${ratio}vh` }}>
                    <Body ref={this.BodyRef} />
                </div>
                <div
                    style={{ height: `${100 - ratio}vh` }}>
                    <ToolBar
                        handleRangeChanged={(n) => this.BodyRef.current.setNumberOfBars(n)}
                        startSortActivated={(method) => this.BodyRef.current.sortArray(method)} />
                </div>
            </div>
        );
    }
}