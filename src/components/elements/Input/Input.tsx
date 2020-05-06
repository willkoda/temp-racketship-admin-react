import React, {useRef} from 'react';
import './Input.scss';

interface Props {
    changeCallback(result: ResultInterface): void;
    error?: string;
    id: string;
    inputBackgroundColor?: string;
    margin?: string;
    placeholder: string;
    validatedProps?: {
        email?: boolean
    };
    valid: boolean;
    value: string;
}

function Input(props: Props) {
    const placeholderRef = useRef<HTMLSpanElement>(null!);

    const validator = () => {
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
                return result['email'] = regex.test(props.value);
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

    const changeHandler = (inputValue: string) => {
        const {valid, error} = validator();
        props.changeCallback({value: inputValue, valid: valid, origin: props.id, error: error})
    }

    const focus = () => {
        placeholderRef.current.style.transform = 'translateY(-35px) scale(0.75)';
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
                {/* <div className={`margin-6 input--group--error ${!props.valid ? 'visible' : ''}`} ref={inputError}>{props.error}</div> */}
            </label>
            <div 
                className="input--error" style={{margin: '3px 6px', visibility: !props.valid ? 'visible' : 'hidden'}}>{props.error}</div>
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