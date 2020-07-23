import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../../img/logo.png"
import "./Header.scss"

import Container from "../Container/Container";
import HeaderLink from "./__link/__link";

const Header = ({links}) => {

    const linksElements = links.map((link, i) => (<HeaderLink link={link} key={i}/>))

    return (
        <Container.Item noPadding>
            <header className="header">
                <NavLink to="/">
                    <img src={logo} className="header__logo" alt="logo"/>
                </NavLink>
                <nav className="header__nav">
                    {linksElements}
                </nav>
            </header>
        </Container.Item>
    )
}

export default Header;