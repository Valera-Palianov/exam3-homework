import React from "react"
import Container from "../Container/Container"
import List from "../List/List"
import Book from "../Book/Book"
import Author from "../Author/Author"
import Member from "../Member/Member"

import Editor from "../../containers/EditorContainer";

const Library = props => {
    const {page, books, authors} = props
    const {selectToEdit, editBookId, editMemberId, bookSaving, memberSaving} = props

    let list = props[page].list.map(item => {

        if(page === 'books') {
            const author = authors.list[authors.idMap[item.authorId]]
            const bookEditor = 'book'

            if(editBookId === item.id) {

                return <Editor editor={bookEditor} key={item.id} />

            } else {

                let bookEditHandler = false
                if(!bookSaving) {
                    bookEditHandler = () => selectToEdit(bookEditor, item)
                }
                return <Book key={item.id} {...item} author={author} editHandler={bookEditHandler}/>
            }
        }

        if(page === 'authors') {

            const booksListA = item.books.map(book => {
                return books.list[books.idMap[book.id]].title
            })

            return <Author key={item.id} {...item} books={booksListA}/>

        }

        if(page === 'members') {

            const booksListM = item.books.map(book => {
                return books.list[books.idMap[book.id]].title
            })
            const memberEditor = 'member'

            if(editMemberId === item.id) {

                return <Editor editor={memberEditor} key={item.id} />

            } else {

                let memberEditHandler = false
                if(!memberSaving) {
                    memberEditHandler = () => selectToEdit(memberEditor, item)
                }
                return <Member key={item.id} {...item} books={booksListM} editHandler={memberEditHandler}/>

            }
        }

        return <div>Ghost</div>

    })

    return (
        <Container.Item heading={page}>
            <main className="library">
                <List list={list}/>
            </main>
        </Container.Item>
    )
}

export default Library