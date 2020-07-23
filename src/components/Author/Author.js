import React from "react"
import List from "../List/List";

const Author = props => {

    const {firstName, lastName, info, birthday, books} = props

    const listProps = {
        title: `${firstName} ${lastName}`,
        info: info,
        subInfo: `Books: ${books.join(' | ')}`,
        subTitle: new Date(birthday).toLocaleDateString()
    }

    return (
        <div className={'author'}>
            <List.Item {...listProps}/>
        </div>
    )
}

export default Author