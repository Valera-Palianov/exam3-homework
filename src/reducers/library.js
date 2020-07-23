import {
    UPDATE_REQUEST,
    UPDATE_DONE,
    MANUAL_UPDATE,
    SORT_DIRECTION_CHANGE,
    SORT_FIELD_CHANGE
} from "../actions/LibraryActions"

import {getIdMap, sorter, reverser} from "../utils/helpers";

const initialState = {
    books: {
        list: null,
        idMap: {},
        errors: {
            message: null,
            description: null
        },
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            title: {
                title: "Title",
                type: "string"
            }
        },
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    authors: {
        list: null,
        idMap: {},
        errors: {
            message: null,
            description: null
        },
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            firstName: {
                title: "First Name",
                type: "string"
            },
            lastName: {
                title: "Last Name",
                type: "string"
            },
            birthday: {
                title: "Birthday",
                type: "date"
            }
        },
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    members: {
        list: null,
        idMap: {},
        errors: {
            message: null,
            description: null
        },
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            firstName: {
                title: "First Name",
                type: "string"
            },
            lastName: {
                title: "Last Name",
                type: "string"
            }
        },
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    flags: {
        updatingProcess: false,
        needToUpdate: false,
    }
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_REQUEST:

            const clearErrors = {}
            for(let item of action.payload.listToUpdate) {
                clearErrors[item] = {
                    ...state[item],
                    errors: {
                        message: null,
                        description: null
                    }
                }
            }

            return {
                ...state,
                ...clearErrors,
                flags: {
                    ...state.flags,
                    updatingProcess: true,
                    needToUpdate: false
                }
            }
        case UPDATE_DONE:

            const data = action.payload.data
            let result = {}
            for(let key in data) {

                result[key] = {
                    ...state[key],
                    list: data[key].list,
                    errors: {
                        ...data[key].errors
                    },
                    options: {
                        activeSortField: "id",
                        activeSortDirection: "asc",
                    }
                }
                if(data[key].list !== null) {
                    result[key].idMap = getIdMap(data[key].list)
                } else {
                    result[key].idMap = {}
                }
            }

            return {
                ...state,
                ...result,
                flags: {
                    updatingProcess: false,
                    needToUpdate: false
                }
            }
        case MANUAL_UPDATE:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    needToUpdate: true
                }
            }
        case SORT_DIRECTION_CHANGE:

            const listToReverse = action.payload.list
            const currentDirection = state[listToReverse].options.activeSortDirection
            const newDirection = currentDirection === 'asc' ? 'desc' : 'asc'
            const reversed = reverser(state[listToReverse].list)

            return {
                ...state,
                [listToReverse]: {
                    ...state[listToReverse],
                    list: reversed,
                    idMap: getIdMap(reversed),
                    options: {
                        ...state[listToReverse].options,
                        activeSortDirection: newDirection
                    }
                }
            }
        case SORT_FIELD_CHANGE:

            const listToSort = action.payload.list
            const newField = action.payload.key
            const fieldType = state[listToSort].sortFields[newField].type
            const sorted = sorter(state[listToSort].list, newField, fieldType)

            return {
                ...state,
                [listToSort]: {
                    ...state[listToSort],
                    list: sorted,
                    idMap: getIdMap(sorted),
                    options: {
                        ...state[listToSort].options,
                        activeSortField: newField,
                        activeSortDirection: 'asc'
                    }
                }
            }
        default:
            return state
    }
}

export default libraryReducer