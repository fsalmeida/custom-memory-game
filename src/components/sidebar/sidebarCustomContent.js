import React, { Component } from 'react'

class SidebarCustomContent extends Component {
    render() {
        return (
            <div className="sidebar-custom-content">
                {this.props.children}
            </div>
        )
    }
}

export default SidebarCustomContent