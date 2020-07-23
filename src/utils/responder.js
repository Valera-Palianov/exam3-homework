import React from "react";
import axios from "axios"

async function responder(listToLoad) {
    const server = 'http://192.168.99.100:5555/apiV1'
    const paths = {
        books: "/book",
        authors: "/author",
        members: "/user"
    }

    const requests = []
    for(let load of listToLoad) {
        if(paths[load]) {
            let url = server+paths[load]
            requests.push({
                key: load,
                url: url,
                request: axios.get(url)
            })
        } else {
            return {
                error: "What?",
                description: "Responder does not know such a request"
            }
        }
    }

    const result = {}
    for(let request of requests) {

        result[request.key] = {}

        let response
        try {response = await request.request}
        catch (e) {response = e.response}

        let status
        try {status = response.status}
        catch (e) {status = 0}

        if(status === 200) {
            result[request.key].error = {
                message: null,
                description: null
            }
            if(request.key === 'members') {
                result[request.key].list = response.data.rows
            } else {
                result[request.key].list = response.data
            }
            continue
        }

        result[request.key].list = null
        if(status === 404) {
            result[request.key].error = {
                message: "The server said 404",
                description: `${request.key} not found at ${request.url}`
            }
            continue
        }

        if(isNaN(status)) {
            result[request.key].error =  {
                message: `The server said ${status}`,
                description: `We don't know what to do about it`
            }
            continue
        }

        result[request.key].error = {
            message: `Not responding`,
            description: (
                <>
                    Current address {server}.<br/><br/>
                    You probably want to change the server address to "localhost",
                    you can do this in src/utils/responder.js<br/><br/>
                    I should have done it, but seems like I forgot, sorry about that ¯\_(ツ)_/¯
                </>
            )
        }
    }

    return result
}


export default responder