import React, {useEffect, useRef, useState} from 'react';
import './Input.scss';

interface Props {
    id: string,
    inputBackgroundColor?: string,
    placeholder: string
}

function Input(props: Props) {
    const placeholderRef = useRef<HTMLSpanElement>(null!);
    const [value, setValue] = useState('');

    const changeHandler = (inputValue: string) => {
        setValue(inputValue)
    }

    useEffect(() => {
        if (value.length > 0) {
            placeholderRef.current.style.transform = 'translateY(-35px) scale(0.8)';
        }
    }, [value])

    return (
        <div className="Input">
            <label htmlFor={props.id}>
                <input 
                    value={value}
                    onChange={(e) => changeHandler(e.target.value)}
                    className="padding-top-bottom-10 padding-left-right-5" type="text" id={props.id} 
                    style={{backgroundColor: props.inputBackgroundColor  || 'transparent'}}/>
                <span ref={placeholderRef} className="label--placeholder">{props.placeholder}</span>
                <span className="input--border"></span>
            </label>
        </div>
    )
}

export default Input;