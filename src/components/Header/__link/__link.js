import React from "react"
import {NavLink} from "react-router-dom";

const HeaderLink = ({link}) => {
    return (
        <NavLink
            to={`/${link}`}
            activeClassName='header__link_active'
            className="header__link">
            {link}
        </NavLink>
    )
}

export default HeaderLink