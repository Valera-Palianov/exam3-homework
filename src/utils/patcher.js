import axios from "axios"
import {server} from "./server"

async function patcher(toLoad) {

    const {editor, id, object} = toLoad
    let request = {
        editor: editor
    }
    if(id === 'new') {
        const url = `${server}/${editor === 'member' ? 'user' : editor}`
        delete object.id
        request = {
            ...request,
            url: url,
            request: axios.post(url, object)
        }
    } else {
        const url = `${server}/${editor === 'member' ? 'user' : editor}/${id}`
        request = {
            ...request,
            url: url,
            request: axios.patch(url, object)
        }
    }

    let response
    try {response = await request.request}
    catch (e) {response = e.response}

    let status
    try {status = response.status}
    catch (e) {status = 0}

    if(status === 200) {
        return {
            status: 'ok'
        }
    }

    if(status === 404) {
        return {
            status: 'error',
            message: "The server said 404",
            description: `${request.editor} not found at ${request.url}`
        }
    }

    if(isNaN(status)) {
        return {
            status: 'error',
            message: `The server said ${status}`,
            description: `We don't know what to do about it`
        }
    }

    return {
        status: 'error',
        message: `Not responding`,
        description: server
    }
}


export default patcher