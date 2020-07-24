import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListItem = props => {

    const {title, subTitle, info, subInfo, status, editHandler} = props

    let editor = ''
    if(editHandler) {
        editor = <div onClick={editHandler} className="list__edit"><FontAwesomeIcon icon='pencil-alt' /></div>
    }

    return (
        <>
            {editor}
            <h3 className="list__title">{title}</h3>
            <div className="list__sub-title">{subTitle}</div>
            <div className="list__info">{info}</div>
            <div className="list__sub-info">{subInfo}</div>
            <div className="list__status">{status}</div>
        </>
    )
}

export default ListItem