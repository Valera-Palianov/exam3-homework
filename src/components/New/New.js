import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./New.scss"

const New = ({editor, handler}) => {

    let object
    if(editor === 'book') {
        object = {
            id: 'new',
            title: '',
            info: '',
            authorId: 1,
            userId: null
        }
    }

    if(editor === 'member') {
        object = {
            id: 'new',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            books: []
        }
    }

    if(editor === 'author') {
        object = {
            id: 'new',
            firstName: '',
            lastName: '',
            info: '',
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