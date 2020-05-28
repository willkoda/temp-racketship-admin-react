import React from 'react';
import './Timeline.scss';
import {formatDate} from '../../auxiliary/functions/format-date';

interface TimeLineItem {
    date: string;
    content: string;
    iconElement: JSX.Element;
}

interface Props {
    timeLineItems: Array<TimeLineItem>;
}

function Timeline(props: Props) {
    return (
        <div className="Timeline">
            {props.timeLineItems.map((el, index) => (
                <div key={index} className="timeline--item padding-left-45">
                    <div className="icon--container">
                        {el.iconElement}
                    </div>
                    <div className="timeline--content">
                        <span className="text">
                            {el.content}
                        </span>
                        <span className="date">
                            {formatDate(el.date, {showTime: true})}
                        </span>
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default Timeline;