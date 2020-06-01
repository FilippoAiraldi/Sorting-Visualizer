import React from 'react'
import './ArrayBar.css'

export default class ArrayBar extends React.Component {
    /* constructor(props) {
        super(props)
    } */

    render() {
        return (
            <div
                className="array-bar"
                style={{
                    height: `${this.props.barHeight}%`,
                    width: `${this.props.barWidth}%`
                }}
            />);
    }
}