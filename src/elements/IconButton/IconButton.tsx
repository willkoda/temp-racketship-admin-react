import React, {useRef} from 'react';
import './IconButton.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';

interface Props {
    className?: string;
    color?: string,
    clickHandler(e: React.MouseEvent): void,
    disabled?: boolean,
    iconElement: JSX.Element,
    margin?: string,
    waveColor: string;
}

function IconButton(props: Props) {
    const waveElementRef = useRef<HTMLButtonElement>(null!);
    const buttonClass = ['IconButton', props.margin, 'dark', props.className];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        waveAnimation({event: e, waveElementRef: waveElementRef, waveColor: props.waveColor});
        props.clickHandler(e);
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