import React from "react"
import Button from "../Button/Button";
import "./Editor.scss"
import Status from "../Status/Status";

const Editor = props => {

    const {cancel, change, save, fields, flags, error} = props

    const fieldElements = fields.map(field => {

        const changeHandler = (e) => {
            let canChange = true
            if(field.validation) {
                canChange = false
                if(field.validation.test(e.target.value)) {
                    canChange = true
                }
            }
            if(canChange) change(field.name, e.target.value)
        }

        let element = ''
        const elementProps = {
            name: field.name,
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
            default:
                element = <input {...elementProps} className={'editor__input'}/>
        }

        return <div key={field.name} className={'editor__field'}>{element}</div>
    })

    let overlay = ''
    if(flags.showOverlay) {
        let status
        if(flags.savingProcess) {
            status = <Status />
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

    return (
        <div className={'editor'}>
            {overlay}
            {fieldElements}
            <div className={'editor__buttons'}>
                <Button disabled={flags.savingProcess} title={'Save'} clickHandler={save}/>
                <Button disabled={flags.savingProcess} title={'Cancel'} clickHandler={cancel}/>
            </div>
        </div>
    )
}

export default Editor
