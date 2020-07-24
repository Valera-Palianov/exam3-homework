import React from "react"
import ContainerItem from "./__item/__item"
import "./Container.scss"


const Container = ({className, children}) => {

    let classes = "container"
    if(className) classes += ' '+className

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

Container.Item = ContainerItem

export default Container