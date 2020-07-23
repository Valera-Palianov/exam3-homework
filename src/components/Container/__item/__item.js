import React from "react";

const ContainerItem = ({className, noPadding, heading, children}) => {

    let classes = "container__item"
    if(className) classes += ' '+className
    if(noPadding) classes += ' container__item_rp'

    let headingElem = ''
    if(heading) {headingElem = <div className="container__heading">{heading}</div>}

    return (
        <div className={classes}>
            {headingElem}
            {children}
        </div>
    )
}

export default ContainerItem