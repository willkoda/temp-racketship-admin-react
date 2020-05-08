import React from 'react';
import './Container.scss';

interface Props {
    children: Array<JSX.Element> | JSX.Element;
    constrain?: number;
    paddingOnly: boolean;
}

function Container(props: Props) {
    return (
        <div className="Container">
            {props.paddingOnly ? props.children : 
            <div className="container--content">
                <div className="container--content__constrain" style={{maxWidth: props.constrain + 'px' || '100%'}}>
                    {props.children}
                </div>
            </div>
            }
        </div>
    )
}

export default Container;