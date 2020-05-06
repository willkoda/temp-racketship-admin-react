import React, {useRef, useState} from 'react';
import './Input.scss';

interface Props {
    changeCallback(result: ResultInterface): void, 
    id: string,
    inputBackgroundColor?: string,
    placeholder: string,
    value: string
}

function Input(props: Props) {
    const placeholderRef = useRef<HTMLSpanElement>(null!);

    const changeHandler = (inputValue: string) => {
        props.changeCallback({value: inputValue, valid: true, origin: props.id})
    }

    const focus = () => {
        placeholderRef.current.style.transform = 'translateY(-35px) scale(0.8)';
    }

    const blur = () => {
        if (props.value.length > 0) return;
        placeholderRef.current.style.transform = 'translateY(-50%) scale(1)';
    }

    return (
        <div className="Input">
            <label htmlFor={props.id}>
                <input 
                    value={props.value}
                    onChange={(e) => changeHandler(e.target.value)}
                    onFocus={() => focus()}
                    onBlur={() => blur()}
                    className="padding-top-bottom-10 padding-left-right-5" type="text" id={props.id} 
                    style={{backgroundColor: props.inputBackgroundColor  || 'transparent'}}/>
                <span ref={placeholderRef} className="label--placeholder">{props.placeholder}</span>
                <span className="input--border"></span>
            </label>
        </div>
    )
}

export interface ResultInterface {
    origin: string, 
    valid: boolean,
    value: string
}

export default Input;