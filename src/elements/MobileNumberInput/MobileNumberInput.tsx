import React, {useLayoutEffect, useRef} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
import './MobileNumberInput.scss';
import {parsePhoneNumberFromString} from 'libphonenumber-js/max';

interface Props {
    change(params: ResultInterface): void;
    error: string;
    id: string;
    margin?: string;
    timeStamp: number;
    valid: boolean;
    value: string;
}

function MobileNumberInput(props: Props) {
    const errorElement = useRef<HTMLDivElement>(null!);

    const handleChange = (value: string, data: any) => {
        let valid;
        let formatted = parsePhoneNumberFromString(value, data.countryCode.toUpperCase());
        formatted ? valid = formatted.isValid() : valid = false;
        
        const result = {
            origin: props.id,
            value: value,
            valid: valid,
            error: valid ? '' : 'The number is invalid'
        }
        props.change(result);
    }

    useLayoutEffect(() => {
        errorElement.current.style.opacity = '0';
        const timeout = setTimeout(() => {
            errorElement.current.style.opacity = '1';
        }, 200)
        return () => {
            clearTimeout(timeout);
        }
        
    }, [props.timeStamp]);

    return (
        <div className={`MobileNumberInput ${props.margin}`}>
            <label htmlFor={props.id}>
                <PhoneInput
                    country={'us'}
                    value={props.value || ''}
                    masks={{ph: '... ... ....', at: '... ... ....'}}
                    onChange={handleChange}
                    enableSearch={true}
                />
            </label>
            <div 
                ref={errorElement}
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

export default MobileNumberInput;