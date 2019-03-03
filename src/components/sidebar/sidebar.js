import './sidebar.scss';
import React, { Component } from 'react'
import SidebarMenu from './sidebarMenu'
import SidebarMenuItem from './sidebarMenuItem'
import SidebarSubmenu from './sidebarSubmenu'
import SidebarHeader from './sidebarHeader'
import SidebarFooter from './sidebarFooter'
import SidebarCustomContent from './sidebarCustomContent'

class Sidebar extends Component {
    children = () => React.Children.toArray(this.props.children);

    render() {
        return (
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">

                    <div className="sidebar-brand">
                        <a href="#">{this.props.title}</a>
                        <div id="close-sidebar" onClick={this.props.toggle}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    {this.children().filter(function (child) {
                        console.log(child.type.name)
                        return child.type.name != 'SidebarFooter';
                    })}
                </div>

                {this.children().filter(function (child) {
                    return child.type.name == 'SidebarFooter';
                })}

            </nav>
        )
    }
}

Sidebar.Header = SidebarHeader;
Sidebar.CustomContent = SidebarCustomContent;
Sidebar.Menu = SidebarMenu;
Sidebar.Submenu = SidebarSubmenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.Footer = SidebarFooter;

export default Sidebar