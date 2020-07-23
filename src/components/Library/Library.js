import React from "react"
import Container from "../Container/Container"
import List from "../List/List"
import Book from "../Book/Book"
import Author from "../Author/Author"
import Member from "../Member/Member"

const Library = props => {
    const {page, books, authors} = props
    const {bookSelectToEdit, bookEditor} = props

    let list = props[page].list.map(item => {
        switch (page) {
            case "books":
                const author = authors.list[authors.idMap[item.authorId]]

                if(bookEditor.book.id === item.id) {
                    return <div><List.Item title={"Editor"}/></div>
                } else {
                    return <Book key={item.id} {...item} author={author} editHandler={() => bookSelectToEdit(item.id)}/>
                }
            case 'authors':
                const booksListA = item.books.map(book => {return books.list[books.idMap[book.id]].title})
                return <Author key={item.id} {...item} books={booksListA}/>
            case 'members':
                const booksListM = item.books.map(book => {return books.list[books.idMap[book.id]].title})
                return <Member key={item.id} {...item} books={booksListM}/>
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