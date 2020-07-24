import React from 'react'

import Header from "../../containers/HeaderContainer"

import Container from "../Container/Container"
import Router from "../Router/Router"
import "./App.scss"

function App() {
  return (
    <div className="app">
        <div className="app__frame">
            <Container>
                <Header />
            </Container>
            <Container>
                <Router />
            </Container>
        </div>
    </div>
  )
}

export default App