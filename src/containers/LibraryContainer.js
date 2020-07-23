import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Redirect, useParams} from "react-router-dom"
import Status from "../components/Status/Status"
import Library from "../components/Library/Library"
import Filter from "../components/Filter/Filter"

import {
    update,
    manualUpdate,
    sortFieldChange,
    sortDirectionChange,
    bookSelectToEdit
} from "../actions/LibraryActions"

const LibraryContainer = props => {

    const {pages} = props
    const {page} = useParams()
    const pageExist = pages.includes(page)

    const {updatingProcess, needToUpdate} = props.flags
    const {update, manualUpdate} = props

    const {bookEditor} = props

    let isNull = false
    let hasError = false
    let isEmpty = false
    let list = []

    const {books, authors, members} = props
    const dataStatus = {}
    if(pageExist) {
        dataStatus.books = {
            isNull: books.list === null,
            isEmpty: books.list !== null ? books.list.length === 0 : true,
            hasError: books.error.message !== null
        }
        if(page === 'authors' || page === 'books') {dataStatus.authors = {
            isNull: authors.list === null,
            isEmpty: authors.list !== null ? authors.list.length === 0 : true,
            hasError: authors.error.message !== null
        }}
        if(page === 'members' || (page === 'books' && bookEditor.book.id !== null)) {dataStatus.members = {
            isNull: members.list === null,
            isEmpty: members.list !== null ? members.list.length === 0 : true,
            hasError: members.error.message !== null
        }}

        isEmpty = dataStatus[page].isEmpty
        isNull = false
        hasError = false
        for(let status in dataStatus) {
            list.push(status)
            if(dataStatus[status].isNull && !isNull) isNull = true
            if(dataStatus[status].hasError && !hasError) hasError = status
        }
    }

    useEffect(()=>{
        if(pageExist) {
            if(needToUpdate) {
                update(list)
            } else {
                if(!updatingProcess && !hasError && isNull) {
                    update(list)
                }
            }
        }
    })

    if(pageExist) {

        if(updatingProcess) {
            return <Status />
        }

        if(hasError) {
            let heading = props[hasError].error.message
            let description = props[hasError].error.description
            return (
                <Status buttonHandler={manualUpdate} status="error" heading={heading} description={description}/>
            )
        }
        if(isEmpty || isNull) {return <Status status="empty" buttonHandler={manualUpdate}/>}

        const {options, sortFields} = props[page]
        const {sortFieldChange, sortDirectionChange, bookSelectToEdit} = props

        return (
            <>
                <Filter options={options} sortFields={sortFields}
                        fieldChange={(key) => sortFieldChange(page, key)}
                        dirChange={() => sortDirectionChange(page)}
                        manualUpdate={manualUpdate}
                />
                <Library books={books} authors={authors} members={members} page={page}
                         bookSelectToEdit={bookSelectToEdit}
                         bookEditor={bookEditor}/>
            </>
        )
    }

    return <Redirect to="/404"/>
}

const mapStateToProps = state => ({
    ...state.library,
    pages: state.general.pages
})
const mapDispatchToProps = dispatch => ({
    sortFieldChange: (list, key) => dispatch(sortFieldChange(list, key)),
    sortDirectionChange: (list) => dispatch(sortDirectionChange(list)),
    update: (listToUpdate) => dispatch(update(listToUpdate)),
    bookSelectToEdit: (id) => dispatch(bookSelectToEdit(id)),
    manualUpdate: () => dispatch(manualUpdate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)