import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Redirect, useParams} from "react-router-dom"
import {update, manualUpdate, sortFieldChange, sortDirectionChange} from "../actions/LibraryActions"
import Status from "../components/Status/Status";

const LibraryContainer = props => {

    const {pages} = props
    const {page} = useParams()
    const pageExist = pages.includes(page)

    const {updatingProcess, needToUpdate} = props.flags
    const {update, manualUpdate} = props

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
            hasError: books.errors.message !== null
        }
        if(page === 'authors' || page === 'books') {dataStatus.authors = {
            isNull: authors.list === null,
            isEmpty: authors.list !== null ? authors.list.length : true,
            hasError: authors.errors.message !== null
        }}
        if(page === 'members') {dataStatus.members = {
            isNull: members.list === null,
            isEmpty: members.list !== null ? members.list.length : true,
            hasError: members.errors.message !== null
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
            let heading = props[hasError].errors.message
            let description = props[hasError].errors.description
            return (
                <Status buttonHandler={manualUpdate} status="error" heading={heading} description={description}/>
            )
        }
        if(isEmpty) {return <Status status="empty" buttonHandler={manualUpdate}/>}


        return <div>Library</div>
    }

    return <Redirect to="/404"/>
}

const mapStateToProps = state => ({
    ...state.library,
    pages: state.general.pages
})
const mapDispatchToProps = dispatch => ({
    update: (listToUpdate) => dispatch(update(listToUpdate)),
    sortFieldChange: (list, key) => dispatch(sortFieldChange(list, key)),
    sortDirectionChange: (list) => dispatch(sortDirectionChange(list)),
    manualUpdate: () => dispatch(manualUpdate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)