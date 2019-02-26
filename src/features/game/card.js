import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
    }

    getClassName = () => {
        if (this.props.isMatch)
            return "card disabled match";
        else if (this.props.isUnmatch)
            return "card open show disabled unmatched";
        else if (this.props.isOpen)
            return "card open show disabled";
        else
            return "card";
    }

    render() {
        return (
            <li onClick={() => this.props.toggle(this.props.uid)} className={this.getClassName()}><span>{this.props.text}</span></li>
        );
    }
}

export default Card;