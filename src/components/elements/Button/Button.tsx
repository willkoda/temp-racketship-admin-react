import React, {useRef} from 'react';
import './Button.scss';
import {waveAnimation} from '../../../auxiliary/animation/wave-animation';

interface Props {
    backgroundColor: string,
    clickCallback?(): void,
    color?: string,
    text: string,
    width?: string
}

function Button(props: Props) {
    const waveRef = useRef<HTMLSpanElement>(null!);
    const waveElementRef = useRef<HTMLButtonElement>(null!);
    const handleClick = (e: React.MouseEvent) => {
        waveAnimation({event: e, waveRef: waveRef, waveElementRef: waveElementRef});
        if (props.clickCallback) {
            props.clickCallback()
        }
    }
    return (
        <button 
            className="Button"
            onClick={handleClick}
            ref={waveElementRef}
            style={{
                backgroundColor: props.backgroundColor,
                color: props.color || '#fff',
                width: props.width || '100%'
            }}>
            {props.text}
            <span className="--wave" ref={waveRef}></span>
        </button>
    )
}

export default Button;