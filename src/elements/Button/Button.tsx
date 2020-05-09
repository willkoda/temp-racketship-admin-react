import React, {useRef} from 'react';
import './Button.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';

interface Props {
    backgroundColor: string,
    clickCallback?(): void,
    color?: string,
    text: string,
    width?: string,
    waveColor: string
}

function Button(props: Props) {
    const waveElementRef = useRef<HTMLButtonElement>(null!);
    const handleClick = (e: React.MouseEvent) => {
        waveAnimation({event: e, waveElementRef: waveElementRef, waveColor: props.waveColor});
        if (props.clickCallback) {
            props.clickCallback()
        }
    }
    return (
        <button 
            className={`Button ${props.backgroundColor}`}
            onClick={handleClick}
            ref={waveElementRef}
            style={{
                color: props.color || '#fff',
                width: props.width || '100%'
            }}>
            {props.text}
        </button>
    )
}

export default Button;