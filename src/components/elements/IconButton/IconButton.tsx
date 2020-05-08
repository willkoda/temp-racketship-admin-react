import React, {useRef} from 'react';
import './IconButton.scss';
import {waveAnimation} from '../../../auxiliary/animation/wave-animation';

interface Props {
    color: string,
    clickHandler(): void,
    disabled?: boolean,
    iconElement: JSX.Element,
    margin?: string,
    waveColor: string
}

function IconButton(props: Props) {
    const waveRef = useRef<HTMLSpanElement>(null!);
    const waveElementRef = useRef<HTMLButtonElement>(null!);

    const buttonClass = ['IconButton', props.margin, 'dark'];

    const handleClick = (e: React.MouseEvent) => {
        waveAnimation({event: e, waveRef: waveRef, waveElementRef: waveElementRef});
    };

    return (
        <button
            className={buttonClass.join(' ')} 
            onClick={handleClick}
            style={{color: props.color}}
            disabled={props.disabled}
            ref={waveElementRef}
        >
            {props.iconElement}
        <span className="--wave" ref={waveRef} style={{backgroundColor: props.waveColor || 'rgba(0, 0, 0, 0.2)'}} ></span>
        </button>
    )
}

export default IconButton;