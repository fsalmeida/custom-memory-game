import React, { Component } from 'react'

class SidebarHeader extends Component {
    render() {
        return (
            <div className="sidebar-header">
                <div className="user-pic">
                    <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                        alt="User picture" />
                </div>
                <div className="user-info">
                    <span className="user-name">Jhon
          <strong>Smith</strong>
                    </span>
                    <span className="user-role">Administrator</span>
                    <span className="user-status">
                        <i className="fa fa-circle"></i>
                        <span>Online</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default SidebarHeader