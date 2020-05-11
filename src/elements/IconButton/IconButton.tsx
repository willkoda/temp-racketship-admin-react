import React, {useRef} from 'react';
import './IconButton.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';

interface Props {
    color?: string,
    clickHandler(): void,
    disabled?: boolean,
    iconElement: JSX.Element,
    margin?: string,
    waveColor: string
}

function IconButton(props: Props) {
    const waveElementRef = useRef<HTMLButtonElement>(null!);
    const buttonClass = ['IconButton', props.margin, 'dark'];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        waveAnimation({event: e, waveElementRef: waveElementRef, waveColor: props.waveColor});
        props.clickHandler();
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
        </button>
    )
}

export default IconButton;