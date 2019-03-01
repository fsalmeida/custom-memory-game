import React, { Component } from 'react'

class SidebarSubmenu extends Component {

    childrenElements = () => React.Children.toArray(this.props.children);

    render() {
        return this.childrenElements().map((link, index) => {
            return <li key={index}>{link}</li>;
        })
    }
}

export default SidebarSubmenu