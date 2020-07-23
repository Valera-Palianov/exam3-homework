import React from "react"
import Button from "../Button/Button";
import "./Editor.scss"

const Editor = props => {

    const {cancel, change, fields, saveFlag, save} = props
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
        switch (field.type) {
            case 'textarea':
                element =  (
                    <textarea
                        className={'editor__textarea'}
                        name={field.name}
                        value={field.value}
                        onChange={changeHandler}
                        disabled={saveFlag}
                    />
                )
                break
            case 'select':
                const options = field.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })
                element = (
                    <select
                        className={'editor__select'}
                        name={field.name}
                        value={field.value}
                        onChange={changeHandler}
                        disabled={saveFlag}
                    >
                        {options}
                    </select>
                )
                break
            default:
                element = (
                    <input
                        className={'editor__input'}
                        name={field.name}
                        value={field.value}
                        onChange={changeHandler}
                        disabled={saveFlag}
                    />
                )
        }

        return <div key={field.name} className={'editor__field'}>{element}</div>
    })

    return (
        <div className={'editor'}>
            {fieldElements}
            <div className={'editor__buttons'}>
                <Button disabled={saveFlag} title={'Save'} clickHandler={save}/>
                <Button disabled={saveFlag} title={'Cancel'} clickHandler={cancel}/>
            </div>
        </div>
    )
}

export default Editor
