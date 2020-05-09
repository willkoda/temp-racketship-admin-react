import React, {useRef, useEffect, useCallback} from 'react';
import './Input.scss';

interface Props {
    changeCallback(result: ResultInterface): void;
    error?: string;
    id: string;
    inputBackgroundColor?: string;
    inputBorderColor?: string;
    margin?: string;
    placeholder: string;
    timeStamp?: number;
    type?: string;
    validatedProps?: {
        email?: boolean
    };
    valid: boolean;
    value: string;
}

function Input(props: Props) {
    const placeholderRef = useRef<HTMLSpanElement>(null!);
    const inputErrorRef = useRef<HTMLDivElement>(null!);

    const validator = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!props.validatedProps) return {valid: true, error: null};
        type indexSignature = {
            [key: string]: any
        };
        const result: indexSignature = {
            email: {
                valid: true,
                errorMessage: "The email is invalid."
            }
        };
        const predicate: indexSignature = {
            email: () => {
                const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return result['email'] = regex.test(event.target.value);
            }
        }

        Object.entries(props.validatedProps).forEach(el => {
            result[el[0]] = {...result[el[0]], valid: predicate[el[0]]()}
        });
        
        return {
            valid: Object.entries(result).map(e => e[1]['valid']).every(valid => valid),
            error: (function() {
                const error = Object.entries(result).map(e => e[1]).find(el => !el['valid']);
                return error ? error['errorMessage'] : null;
            })()
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {valid, error} = validator(event);
        return {
            origin: props.id, 
            valid: valid,
            value: event.target.value,
            error: error
        }
    }

    const focus = useCallback(() => {
        placeholderRef.current.style.transform = 'translateY(-30px) scale(0.75)';
        placeholderRef.current.style.color = props.inputBorderColor || '#3f51b5'
    }, [props.inputBorderColor])

    const blur = () => {
        if (props.value.length > 0) return;
        placeholderRef.current.style.transform = 'translateY(-50%) scale(1)';
        placeholderRef.current.style.color = 'var(--light-grey)';
    }

    useEffect(() => {
        if (props.value.length > 0) focus();
    }, [props.value, focus])

    useEffect(() => {
        inputErrorRef.current.style.opacity = '0';
        const timeout = setTimeout(() => {
            inputErrorRef.current.style.opacity = '1';
        }, 200)
        return () => {
            clearTimeout(timeout);
        }
    }, [props.timeStamp])

    return (
        <div className="Input">
            <label htmlFor={props.id}>
                <input
                    autoComplete="off"
                    onChange={(e) => props.changeCallback(changeHandler(e))}
                    onFocus={() => focus()}
                    onBlur={() => blur()}
                    className={`padding-top-bottom-10 padding-left-right-5 ${props.margin}`}
                    id={props.id}
                    style={{backgroundColor: props.inputBackgroundColor  || 'transparent'}}
                    type={props.type || 'text'}/>
                <span 
                    ref={placeholderRef}
                    className="label--placeholder"
                    >{props.placeholder}</span>
                <span 
                    className="input--border"
                    style={{
                        backgroundColor: props.inputBorderColor || '#3f51b5'
                    }}
                    >
                </span>
            </label>
            <div 
                ref={inputErrorRef}
                className="input--error" 
                style={{margin: '3px 6px', visibility: !props.valid ? 'visible' : 'hidden'}}>
                {props.error}</div>
        </div>
    )
}

export interface ResultInterface {
    origin: string, 
    valid: boolean,
    value: string,
    error: string
}

export default Input;