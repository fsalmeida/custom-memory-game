import React, { Component } from 'react'

class SidebarMenu extends Component {
    render() {
        return (
            <div className="sidebar-menu">
                <ul>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default SidebarMenu