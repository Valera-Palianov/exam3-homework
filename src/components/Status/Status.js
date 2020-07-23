import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Button/Button";
import "./Status.scss"
import Container from "../Container/Container";

const Status = ({status, icon, spin, heading, description, buttonHandler, buttonTitle}) => {

    const presets = {
        loading: {
            icon: "atom",
            spin: true,
            heading: "Loading...",
            description: "Please stand by"
        },
        notFound: {
            icon: "dizzy",
            spin: false,
            heading: "Not Found",
            description: "We have a very small site where it is very difficult to get lost, but... you are lost"
        },
        empty: {
            icon: "folder-open",
            spin: false,
            heading: "Nothing to display",
            description: "The request did not return any results"
        },
        error: {
            icon: "exclamation-triangle",
            spin: false,
            heading: "Error",
            description: "Something went wrong"
        },
        ops: {
            icon: "dizzy",
            spin: false,
            heading: "That preset does not exist",
            description: "Try something else, like loading, empty or error"
        },
    }

    let preset = presets.loading
    if(status) {
        if(presets[status]) {
            preset = presets[status]
        } else {
            preset = presets['ops']
        }
    }

    let button = ''
    if(buttonHandler) {
        button = <Button
            clickHandler={buttonHandler}
            title={buttonTitle ? buttonTitle : 'Try again'}
            customClass="status__button"
        />
    }

    if(icon) {preset.icon = icon}
    if(spin) {preset.spin = spin}
    if(heading) {preset.heading = heading}
    if(description) {preset.description = description}

    return (
        <Container.Item>
            <div className="status">
                <div className="status__icon">
                    <FontAwesomeIcon icon={preset.icon} spin={preset.spin}/>
                </div>
                <div className="status__heading">
                    {preset.heading}
                </div>
                <div className="status__description">
                    {preset.description}
                </div>
                {button}
            </div>
        </Container.Item>
    )
}

export default Status