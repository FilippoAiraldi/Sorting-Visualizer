import React from 'react'
import './ArrayBar.css'

export default class ArrayBar extends React.Component {
    constructor(props) {
        super(props)
        this.barRef = React.createRef();
    }

    setColor(color) {
        this.barRef.current.style.backgroundColor = color;
    }

    getColor() {
        return this.barRef.current.style.backgroundColor;
    }

    setHeight(h) {
        this.barRef.current.style.height = `${h}%`;
    }

    getHeight() {
        return parseFloat(this.barRef.current.style.height);
    }

    render() {
        return (
            <div
                ref={this.barRef}
                className="array-bar"
                style={{
                    height: `${this.props.height}%`,
                    width: `${this.props.width}%`
                }}
            />
        );
    }
}