import React, { Component } from 'react'

class SidebarFooter extends Component {
    render() {
        return (
            <div className="sidebar-footer">
                    <a href="#">
                        <i className="fa fa-bell"></i>
                        <span className="badge badge-pill badge-warning notification">3</span>
                    </a>
                    <a href="#">
                        <i className="fa fa-envelope"></i>
                        <span className="badge badge-pill badge-success notification">7</span>
                    </a>
                    <a href="#">
                        <i className="fa fa-cog"></i>
                        <span className="badge-sonar"></span>
                    </a>
                    <a href="#">
                        <i className="fa fa-power-off"></i>
                    </a>
                </div>
        )
    }
}

export default SidebarFooter