import React from "react"
import {connect} from "react-redux"

import Editor from "../components/Editor/Editor";

import {
    bookUnselectToEdit,
    memberUnselectToEdit,
    bookChange,
    bookSave
} from "../actions/EditorActions";

const EditorContainer = props => {

    const {mode} = props

    if(mode === 'book' || mode === 'member') {

        const {bookUnselectToEdit, memberUnselectToEdit, bookChange, bookSave} = props
        const {members, authors} = props
        const {bookEditor} = props

        let cancel, change, fields, saveFlag, save
        if(mode === 'book') {
            const book = bookEditor.book

            fields = [
                {
                    name: 'title',
                    value: book.title,
                    type: 'text',
                    validation: /^([^@#$%^&<>])+$/mi
                },
                {
                    name: 'info',
                    value: book.info,
                    type: 'textarea',
                    validation: /^(.)+$/mi
                },
                {
                    name: 'authorId',
                    value: book.authorId,
                    type: 'select',
                    options: authors.list.map(author => ({
                        name: `${author.firstName} ${author.lastName}`,
                        value: author.id
                    }))
                },
                {
                    name: "userId",
                    value: book.userId === null ? 'none' : book.userId,
                    type: 'select',
                    options: [
                        {
                            name: '---',
                            value: 'none'
                        },
                        ...members.list.map(member => ({
                            name: `${member.firstName} ${member.lastName}`,
                            value: member.id
                        }))
                    ]
                }
            ]
            saveFlag = bookEditor.flags.savingProcess
            cancel = bookUnselectToEdit
            change = bookChange
            save = bookSave
        } else {
            fields = []
            cancel = memberUnselectToEdit
        }

        return <Editor save={save} saveFlag={saveFlag} fields={fields} change={change} cancel={cancel}/>
    } else {
        return <div className={"editor"}>Editor can edit only books or members</div>
    }
}

const mapStateToProps = state => ({
    ...state.editor,
    books: state.library.books,
    authors: state.library.authors,
    members: state.library.members
})
const mapDispatchToProps = dispatch => ({
    bookUnselectToEdit: () => dispatch(bookUnselectToEdit()),
    memberUnselectToEdit: () => dispatch(memberUnselectToEdit()),
    bookChange: (name, value) => dispatch(bookChange(name, value)),
    bookSave: () => dispatch(bookSave())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)