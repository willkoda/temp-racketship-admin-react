import React from 'react';
import './IconButton.scss';

interface Props {
    color: string,
    clickHandler(): void,
    disabled?: boolean,
    iconElement: JSX.Element,
    margin?: string
}

function IconButton(props: Props) {
    const buttonClass = ['IconButton', props.margin, 'ripple', 'dark'];
    return (
        <button 
            className={buttonClass.join(' ')} 
            onClick={props.clickHandler}
            style={{color: props.color}}
            disabled={props.disabled}
        >
            {props.iconElement}
        </button>
    )
}

export default IconButton;