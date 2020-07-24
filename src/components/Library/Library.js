import React from "react"
import Container from "../Container/Container"
import List from "../List/List"
import Book from "../Book/Book"
import Author from "../Author/Author"
import Member from "../Member/Member"

import Editor from "../../containers/EditorContainer"
import New from "../../components/New/New"

const Library = props => {
    const {page, books, authors} = props
    const {selectToEdit, editBookId, editMemberId, editAuthorId, bookSaving, memberSaving} = props

    let editor = ''

    let list = props[page].list.map(item => {

        if(page === 'books') {
            const author = authors.list[authors.idMap[item.authorId]]
            editor = 'book'

            if(editBookId === item.id) {

                return <Editor editor={editor} key={item.id} />

            } else {

                let bookEditHandler = false
                if(!bookSaving) {
                    bookEditHandler = () => selectToEdit(editor, item)
                }
                return <Book key={item.id} {...item} author={author} editHandler={bookEditHandler}/>
            }
        }

        if(page === 'authors') {
            editor = 'author'
            const booksListA = item.books.map(book => {
                return books.list[books.idMap[book.id]].title
            })

            return <Author key={item.id} {...item} books={booksListA}/>

        }

        if(page === 'members') {

            const booksListM = item.books.map(book => {
                return books.list[books.idMap[book.id]].title
            })
            editor = 'member'

            if(editMemberId === item.id) {

                return <Editor editor={editor} key={item.id} />

            } else {

                let memberEditHandler = false
                if(!memberSaving) {
                    memberEditHandler = () => selectToEdit(editor, item)
                }
                return <Member key={item.id} {...item} books={booksListM} editHandler={memberEditHandler}/>

            }
        }

        return <div>Ghost</div>

    })

    if(editor !== '') {

        let newElement
        if(
            (editor === 'book' && editBookId === 'new') ||
            (editor === 'member' && editMemberId === 'new') ||
            (editor === 'author' && editAuthorId === 'new')
        ) {
            newElement = <Editor key={'new'} editor={editor} />
        } else {
            newElement = <New key={'new'} editor={editor} handler={(item) => selectToEdit(editor, item)}/>
        }
        list = [newElement, ...list]
    }

    return (
        <Container.Item heading={page}>
            <main className="library">
                <List list={list}/>
            </main>
        </Container.Item>
    )
}

export default Library