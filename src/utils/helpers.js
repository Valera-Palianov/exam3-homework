export const getIdMap = (arr) => {
    const result = {}
    for(let i = 0; i<arr.length; i++) {
        result[arr[i].id] = i
    }
    return result
}

export const sorter = (arr, key, type) => {
    const result = arr.slice()
    if(type === 'int') {
        result.sort((a, b) => {
            return a.id - b.id;
        })
    } else if (type === 'date') {
        result.sort((a, b) => {
            const dateA = new Date(a[key])
            const dateB = new Date(b[key])
            return dateA - dateB;
        })
    } else {
        result.sort((a, b) => {
                const lcA=a[key].toLowerCase()
                const lcB=b[key].toLowerCase()
                if (lcA < lcB) return -1
                if (lcA > lcB) return 1
                return 0
            }
        )
    }
    return result
}

export const reverser = (arr) => {
    return arr.slice().reverse()
}