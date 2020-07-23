import React from "react";
import "./Button.scss"

const Button = props => {

    const title = props.title ? props.title : 'Button'
    const handler = props.clickHandler ? props.clickHandler : () => {}
    const classes = "button "+(props.customClass ? props.customClass : "")

    return (
        <button className={classes} onClick={handler}>{title}</button>
    )
}

export default Button