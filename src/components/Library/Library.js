import React from "react"
import Container from "../Container/Container"
import List from "../List/List"
import Book from "../Book/Book"
import Author from "../Author/Author"
import Member from "../Member/Member"

import Editor from "../../containers/EditorContainer";

const Library = props => {
    const {page, books, authors} = props
    const {bookSelectToEdit, memberSelectToEdit, editBookId, editMemberId} = props

    let list = props[page].list.map(item => {
        switch (page) {
            case "books":
                const author = authors.list[authors.idMap[item.authorId]]
                if(editBookId === item.id) {
                    return <Editor mode={'book'} key={item.id} />
                } else {
                    return <Book key={item.id} {...item} author={author} editHandler={() => bookSelectToEdit(item)}/>
                }
            case 'authors':
                const booksListA = item.books.map(book => {return books.list[books.idMap[book.id]].title})
                return <Author key={item.id} {...item} books={booksListA}/>
            case 'members':
                const booksListM = item.books.map(book => {return books.list[books.idMap[book.id]].title})
                if(editMemberId === item.id) {
                    return <Editor mode={'member'} key={item.id} />
                } else {
                    return <Member key={item.id} {...item} books={booksListM} editHandler={() => memberSelectToEdit(item)}/>
                }
            default:
                return <div><List.Item title={"Ghost item"}/></div>
        }
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