import React from 'react'
import './SortingVisualizer.css'
import Body from './Body/Body'
import ToolBar from './ToolBar/ToolBar'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyRef: React.createRef(),
            toolBarRef: React.createRef()
        };
    }

    render() {
        var ratio = 90; // [0 - 100]
        return (
            <div className="main-window">
                <div style={{ height: `${ratio}vh` }}>
                    <Body
                        ref={this.state.bodyRef}
                        sortingCompleted={() => this.state.toolBarRef.current.sortingCompleted()} />
                </div>
                <div style={{ height: `${100 - ratio}vh` }}>
                    <ToolBar
                        ref={this.state.toolBarRef}
                        handleRangeChanged={(n) => this.state.bodyRef.current.setNumberOfBars(n)}
                        startSortActivated={(m) => this.state.bodyRef.current.sortArray(m)}
                        stopSortActivated={() => this.state.bodyRef.current.stopSorting()} />
                </div>
            </div>
        );
    }
}