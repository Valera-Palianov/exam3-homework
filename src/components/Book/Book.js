import React from "react"
import List from "../List/List";

const Book = props => {

    const {title, info, userId, author, editHandler} = props
    const aviable = userId === null ? "Available" : "Not available"
    const authorName = `${author.firstName} ${author.lastName}`

    const listProps = {
        title: title,
        info: info,
        status: aviable,
        subTitle: authorName,
        editHandler: editHandler
    }

    return (
        <div className={'book'}>
            <List.Item {...listProps}/>
        </div>
    )
}

export default Book
