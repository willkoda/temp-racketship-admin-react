import React, {useRef, useState, useEffect} from 'react';
import './Accordion.scss';
import IconButton from '../../elements/IconButton/IconButton';

import { 
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons';

interface Props {
    content: JSX.Element;
    header: JSX.Element
}

function Accordion(props: Props) {
    const headerButtonRef = useRef<SVGSVGElement>(null!);
    const accordionContainerRef = useRef<HTMLDivElement>(null!);
    const accordionContentRef = useRef<HTMLDivElement>(null!);

    const [accordionExpanded, setAccordionExpanded] = useState(false);

    useEffect(() => {
        if (accordionExpanded) {
            headerButtonRef.current.style.transform = 'rotate(-180deg)';
        } else {
            headerButtonRef.current.style.transform = 'rotate(0deg)';
        }
    }, [accordionExpanded])

    useEffect(() => {
        if (accordionExpanded) {
            accordionContainerRef.current.style.height = `${accordionContentRef.current.offsetHeight}px`;
        } else {
            accordionContainerRef.current.style.height = '0px';
        }
    }, [accordionExpanded])

    return (
        <div className="Accordion">
            <div className="accordion">
                <div className="accordion__header">
                    <div className="header--details">
                        {props.header}
                    </div>
                    <div className="header--button" >
                        <IconButton
                            clickHandler={() => {
                                setAccordionExpanded(!accordionExpanded);
                            }}
                            iconElement={<KeyboardArrowDownIcon ref={headerButtonRef} />}
                            waveColor="rgba(255, 255, 255, 0.2)"
                        />
                    </div>
                </div>
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