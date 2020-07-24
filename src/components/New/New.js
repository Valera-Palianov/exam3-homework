import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./New.scss"

const New = ({editor, handler}) => {

    let object
    if(editor === 'book') {
        object = {
            id: 'new',
            title: 'Title',
            info: 'Info',
            authorId: 1,
            userId: null
        }
    }

    if(editor === 'member') {
        object = {
            id: 'new',
            firstName: 'Name',
            lastName: 'Surname',
            email: 'Email',
            phone: 'Phone',
            books: []
        }
    }

    if(editor === 'author') {
        object = {
            id: 'new',
            firstName: 'Name',
            lastName: 'Surname',
            info: 'Info',
            birthday: '2000-01-01',
            books: []
        }
    }
    return (
        <div className={'new'} onClick={() => handler(object)}>
            <FontAwesomeIcon icon={'plus'}/>
        </div>
    )
}

export default New