import React, {Suspense} from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Library from "../../containers/LibraryContainer"
import Status from "../Status/Status"

const Router = props => {
    return(
        <Suspense fallback={<Status/>}>
            <Switch>
                <Route exact path="/404">
                    <Status status="notFound"/>
                </Route>
                <Route exact path="/:page">
                    <Library />
                </Route>
                <Redirect exact from='/' to='/books'/>
                <Redirect to='/404'/>
            </Switch>
        </Suspense>
    )
}

export default Router