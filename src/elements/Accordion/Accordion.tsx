import React, {useRef, useState, useEffect} from 'react';
import './Accordion.scss';
import {waveAnimation} from '../../auxiliary/animation/wave-animation';

import { 
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons';

interface Props {
    expandedInitially?: boolean;
    content: JSX.Element;
    header: JSX.Element;
    waveColor: string;
}

function Accordion(props: Props) {
    const headerButtonRef = useRef<SVGSVGElement>(null!);
    const accordionContainerRef = useRef<HTMLDivElement>(null!);
    const accordionContentRef = useRef<HTMLDivElement>(null!);
    const waveElementRef = useRef<HTMLButtonElement>(null!);

    // const [accordionExpanded, setAccordionExpanded] = useState(false);
    const [accordionExpanded, setAccordionExpanded] = useState(props.expandedInitially);

    useEffect(() => {
        if (accordionExpanded) {
            headerButtonRef.current.style.transform = 'translateY(-50%) rotate(-180deg)';
        } else {
            headerButtonRef.current.style.transform = 'translateY(-50%) rotate(0deg)';
        }
    }, [accordionExpanded])

    useEffect(() => {
        if (accordionExpanded) {
            accordionContainerRef.current.style.height = `${accordionContentRef.current.offsetHeight}px`;
        } else {
            accordionContainerRef.current.style.height = '0px';
        }
    }, [accordionExpanded])

    const clickHandler = (e: React.MouseEvent) => {
        waveAnimation({event: e, waveElementRef: waveElementRef, waveColor: props.waveColor});
        setAccordionExpanded(!accordionExpanded)
    }

    return (
        <div className="Accordion">
            <div className="accordion">
                <button className="header--button" onClick={clickHandler} ref={waveElementRef}>
                    {props.header}
                    <KeyboardArrowDownIcon className="arrow--icon" ref={headerButtonRef} />
                </button>
                <div className="accordion--content--container" ref={accordionContainerRef}>
                    <div className="accordion--content" ref={accordionContentRef}>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion;