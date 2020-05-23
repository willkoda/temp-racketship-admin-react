import React, {useRef} from 'react';
import './Button.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    backgroundColor: 'accent--two' | 'accent--three' | 'dark--red' | 'status--approved' | 'status--requested' | 'status--success';
    borderRadius?: string;
    buttonType?: 'text';
    clickCallback?(): void;
    color?: string;
    loading?: boolean;
    margin?: string;
    padding?: string;
    text: string;
    width?: string;
    waveColor: string;
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
            className={`Button ${props.loading ? 'loading' : props.backgroundColor} ${props.margin}`}
            data-button-type={props.buttonType}
            onClick={handleClick}
            ref={waveElementRef}
            style={{
                borderRadius: props.borderRadius || '3px',
                color: props.color || '#fff',
                padding: props.padding || '10px 8px',
                width: props.width || '100%'
            }}
            disabled={props.loading}
            >
            {
                props.loading ? 
                    <span className="loading--element--container">
                        <CircularProgress size={15} style={{color: 'rgba(0, 0, 0, 0.3)'}} />
                    </span>
                        :
                    props.text
            }
        </button>
    )
}

export default Button;