import React, { Component } from 'react';
import { isMobile } from "react-device-detect";

const minFontSize = isMobile ? 8 : 16;
const maxFontSize = isMobile ? 22 : 30;
const maxWordSize = 15;
const minWordSize = 2;
const factor = (maxFontSize - minFontSize) / (maxWordSize - minWordSize);

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

    getSpanStyles = () => {
        let words = this.props.text.split(' ');
        let wordsMaxSize = Math.max(words.map(w => w.length));
        let fontSize = maxFontSize - (factor * wordsMaxSize);

        if (fontSize < minFontSize)
            fontSize = minFontSize;

        return {
            fontSize: fontSize + 'px'
        };
    }

    render() {
        return (
            <li onClick={() => this.props.toggle(this.props.uid)} className={this.getClassName()}><span style={this.getSpanStyles()}>{this.props.text}</span></li>
        );
    }
}

export default Card;