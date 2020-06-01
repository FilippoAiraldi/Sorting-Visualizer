import React from 'react'
import './ArrayBar.css'

export default class ArrayBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="bar"
                key={this.props.index}
                style={{
                    height: `${this.props.height}%`,
                    width: `${this.props.width}%`
                }} />);
    }
}