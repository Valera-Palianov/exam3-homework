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

    const save = () => {props.save(editor)}
    const cancel = () => {props.unselectToEdit(editor)}
    const change = (name, value, validation) => {props.change(editor, name, value, validation)}

    const {members, authors} = props

    const flags = props[editor].flags
    const error = props[editor].error
    const validation = props[editor].validation

    let fields
    if(editor === 'book') {
        const book = props.book.object

        fields = [
            {
                name: 'title',
                value: book.title,
                type: 'text',
                validation: {
                    regex: /^([a-zA-Zа-яА-Я0-9:., !—-])+$/mi,
                    message: "The field cannot be empty and can only contain letters, numbers and punctuation marks"
                }
            },
            {
                name: 'info',
                value: book.info,
                type: 'textarea',
                validation: {
                    regex: /^(.)+$/mi,
                    message: "The field cannot be empty"
                }
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
    } else if(editor === 'author') {

        const author = props.author.object

        fields = [
            {
                name: 'firstName',
                value: author.firstName,
                type: 'text',
                validation: {
                    regex: /^([a-zA-Zа-яА-Я])+$/mi,
                    message: "The field cannot be empty and can only contain letters"
                }
            },
            {
                name: 'lastName',
                value: author.lastName,
                type: 'text',
                validation: {
                    regex: /^([a-zA-Zа-яА-Я])+$/mi,
                    message: "The field cannot be empty and can only contain letters"
                }
            },
            {
                name: 'info',
                value: author.info,
                type: 'textarea',
                validation: {
                    regex: /^(.)+$/mi,
                    message: "The field cannot be empty"
                }
            },
            {
                name: 'birthday',
                value: author.birthday,
                type: 'date'
            }
        ]

    } else {
        const member = props.member.object

        fields = [
            {
                name: 'email',
                value: member.email,
                type: 'text',
                validation: {
                    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "The field should look like Email"
                }
            },
            {
                name: 'phone',
                value: member.phone,
                type: 'text',
                validation: {
                    regex: /^([0-9)(x. -])+$/mi,
                    message: "The field cannot be empty and can only contain numbers, brakets, dots, dash, letter 'x'... Oh, wtf with this numbers"
                }
            },
            {
                name: 'firstName',
                value: member.firstName,
                type: 'text',
                validation: {
                    regex: /^([a-zA-Zа-яА-Я])+$/mi,
                    message: "The field cannot be empty and can only contain letters"
                }
            },
            {
                name: 'lastName',
                value: member.lastName,
                type: 'text',
                validation: {
                    regex: /^([a-zA-Zа-яА-Я])+$/mi,
                    message: "The field cannot be empty and can only contain letters"
                }
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
            validation={validation}
        />
    )
}

const mapStateToProps = state => ({
    ...state.editor,
    books: state.library.books,
    authors: state.library.authors,
    members: state.library.members
})
const mapDispatchToProps = dispatch => ({
    unselectToEdit: (editor) => dispatch(unselectToEdit(editor)),
    change: (editor, name, value, validation) => dispatch(change(editor, name, value, validation)),
    save: (editor) => dispatch(save(editor))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)