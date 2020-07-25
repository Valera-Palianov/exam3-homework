import React from "react"
import Button from "../Button/Button";
import "./Editor.scss"
import Status from "../Status/Status";

const Editor = props => {

    const {cancel, change, save, fields, flags, error, validation} = props

    const fieldElements = fields.map(field => {

        const changeHandler = (e) => {
            let valid = true
            if(field.validation) {
                valid = field.validation.regex.test(e.target.value)
            }
            change(field.name, e.target.value, valid)
        }

        let element = ''
        let validationMessage = ''

        if(field.validation) {
            if(validation[field.name] === false) {
                validationMessage = field.validation.message
            }
        }

        const elementProps = {
            required: true,
            name: field.name,
            placeholder: field.name,
            value: field.value,
            onChange: changeHandler,
            disabled: flags.savingProcess
        }

        switch (field.type) {
            case 'select':
                const options = field.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })

                element = <select multiple={field.multiple} {...elementProps} className={'editor__select'}>{options}</select>
                break
            case 'textarea':
                element = <textarea {...elementProps} className={'editor__textarea'}/>
                break
            case 'date':
                element =  <input type={'date'} {...elementProps} className={'editor__input'}/>
                break
            default:
                element = <input {...elementProps} className={'editor__input'}/>
        }

        return (
            <div key={field.name} className={'editor__field'}>
                <div className={'editor__element'}>{element}</div>
                <div className={'editor__validation'}>{validationMessage}</div>
            </div>
        )
    })

    let overlay = ''
    if(flags.showOverlay) {
        let status
        if(flags.savingProcess) {
            status = <Status heading={'Sending...'}/>
        } else if (flags.savingError) {
            status = <Status status={'error'} heading={error.message} description={error.description}/>
        } else {
            status = <Status status={'ok'}/>
        }

        overlay = (
            <div className={'editor__overlay'}>
                {status}
            </div>
        )
    }

    let validationFail = false
    for(let key in validation) {
        if(!validation[key]) {
            validationFail = true
            break
        }
    }

    return (
        <form className={'editor'} onSubmit={(e) => {e.preventDefault(); save()}}>
            {overlay}
            {fieldElements}
            <div className={'editor__buttons'}>
                <Button disabled={flags.savingProcess || validationFail} title={'Send'}/>
                <Button disabled={flags.savingProcess} title={'Cancel'} clickHandler={cancel}/>
            </div>
        </form>
    )
}

export default Editor
