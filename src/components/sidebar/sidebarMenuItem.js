import React, { Component } from 'react'

class SidebarMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasSubmenu: this.submenuItem() != null,
            isSubmenuOpen: false
        };
    }

    children = () => React.Children.toArray(this.props.children);

    elementsOtherThanSubmenu = () => {
        return this.children().filter(function (child) {
            console.log('2: ' + child.type.name);
            return child.type.name != 'SidebarSubmenu';
        })
    }

    submenuItem = () => {
        let submenuItem = this.children().filter(function (child) {
            return child.type.name == 'SidebarSubmenu';
        });

        if (submenuItem.length > 0)
            return submenuItem[0];
        else
            return null;
    }

    menuClassName = () => {
        let className = "";

        if (this.state.hasSubmenu)
            className += " sidebar-dropdown ";

        if (this.state.isSubmenuOpen)
            className += " active ";

        return className;
    }

    toggle = () => {
        this.setState({ isSubmenuOpen: !this.state.isSubmenuOpen });
    }

    render() {
        return (
            <li className={this.menuClassName()} >

                {this.state.hasSubmenu
                    ? (<a href="#" onClick={this.toggle}>{this.elementsOtherThanSubmenu()}</a>)
                    : (this.elementsOtherThanSubmenu())}

                {this.submenuItem() != null
                    ? (
                        <div className={"sidebar-submenu" + (this.state.isSubmenuOpen ? " is-open" : "")}>
                            <ul>
                                {this.submenuItem()}
                            </ul>
                        </div>
                    ) : null}
            </ li>
        )
    }
}

export default SidebarMenuItem