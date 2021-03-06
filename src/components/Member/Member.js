import React from "react"
import List from "../List/List";

const Member = props => {

    const {firstName, lastName, phone, email, books, editHandler} = props

    const booksList = books.length ? books.join(' | ') : "none"

    const listProps = {
        title: `${firstName} ${lastName}`,
        subInfo: `Books: ${booksList}`,
        subTitle: `${email} | ${phone}`,
        editHandler: editHandler
    }

    return (
        <div className={'author'}>
            <List.Item {...listProps}/>
        </div>
    )
}

export default Member