import React, {useRef} from 'react';
import './IconButton.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';

interface Props {
    className?: string;
    color?: string;
    clickHandler(e: React.MouseEvent): void;
    disabled?: boolean;
    iconElement: JSX.Element;
    margin?: string;
    showToolTip?: boolean;
    toolTip?: string;
    waveColor: string;
}

function IconButton(props: Props) {
    const waveElementRef = useRef<HTMLButtonElement>(null!);
    const buttonClass = ['IconButton', props.margin, 'dark', props.className];
    const toolTipRef = useRef<HTMLDivElement>(null!);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        waveAnimation({event: e, waveElementRef: waveElementRef, waveColor: props.waveColor});
        props.clickHandler(e);
    };

    const mouseEnterHandler = () => {
        if (!props.showToolTip) return;
        toolTipRef.current.style.transform = 'translateX(-50%) scale(1)';
        toolTipRef.current.style.opacity = '1';
    }

    const mouseLeaveHandler = () => {
        toolTipRef.current.style.transform = 'translateX(-50%) scale(0.85)';
        toolTipRef.current.style.opacity = '0';
    }

    return (
        <button
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={buttonClass.join(' ')} 
            onClick={handleClick}
            style={{color: props.color}}
            disabled={props.disabled}
            ref={waveElementRef}
        >
            {props.iconElement}
            <div className="icon--button--tooltip" ref={toolTipRef}>
                <span>{props.toolTip}</span>
            </div>
        </button>
    )
}

export default IconButton;