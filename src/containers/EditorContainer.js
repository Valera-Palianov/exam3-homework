import React from "react"
import {connect} from "react-redux"

import Editor from "../components/Editor/Editor";

import {
    unselectToEdit,
    change,
    save
} from "../actions/EditorActions";

const EditorContainer = props => {

    const {editor} = props

    if(editor === 'book' || editor === 'member') {


        const save = () => {props.save(editor)}
        const cancel = () => {props.unselectToEdit(editor)}
        const change = (name, value) => {props.change(editor, name, value)}

        const {members, authors} = props

        const flags = props[editor].flags
        const error = props[editor].error

        let fields
        if(editor === 'book') {
            const book = props.book.object

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
                        {name: '---', value: 'none'},
                        ...members.list.map(member => ({
                            name: `${member.firstName} ${member.lastName}`,
                            value: member.id
                        }))
                    ]
                }
            ]
        } else {
            const member = props.member.object

            fields = [
                {
                    name: 'email',
                    value: member.email,
                    type: 'text',
                    validation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                {
                    name: 'phone',
                    value: member.phone,
                    type: 'text',
                    validation: /^([0-9)(x. -])+$/mi
                },
                {
                    name: 'firstName',
                    value: member.firstName,
                    type: 'text',
                    validation: /^([a-zA-Zа-яА-Я])+$/mi
                },
                {
                    name: 'lastName',
                    value: member.lastName,
                    type: 'text',
                    validation: /^([a-zA-Zа-яА-Я])+$/mi
                }
            ]
        }

        return (
            <Editor
                save={save}
                change={change}
                cancel={cancel}
                flags={flags}
                error={error}
                fields={fields}
            />
        )

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
    unselectToEdit: (editor) => dispatch(unselectToEdit(editor)),
    change: (editor, name, value) => dispatch(change(editor, name, value)),
    save: (editor) => dispatch(save(editor))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)