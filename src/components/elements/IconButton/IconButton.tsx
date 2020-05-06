import React, {useRef, useEffect} from 'react';
import './IconButton.scss';

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

    useEffect(() => {
        waveRef.current.style.width = waveElementRef.current.offsetWidth + 'px';
        waveRef.current.style.height = waveElementRef.current.offsetHeight + 'px';
    }, []);

    const buttonClass = ['IconButton', props.margin, 'dark'];

    const handleClick = (e: React.MouseEvent) => {
        waveRef.current.classList.remove('wave--animation');
        setTimeout(() => {
            waveRef.current.classList.add('wave--animation');
        }, 100)

        const rect = waveElementRef.current.getBoundingClientRect();
        const offset = {
            top: rect.top,
            left: rect.left
        }

        const x = (e.pageX - offset.left)
        const y = (e.pageY - offset.top)

        waveRef.current.style.left = `${x}px`;
        waveRef.current.style.top = `${y}px`;
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
        <span className="wave" ref={waveRef} style={{backgroundColor: props.waveColor || 'rgba(0, 0, 0, 0.2)'}} ></span>
        </button>
        
    )
}

export default IconButton;