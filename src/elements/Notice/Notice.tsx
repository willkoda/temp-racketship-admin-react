import React, {useRef, useEffect, useLayoutEffect, useState} from 'react';
import './Notice.scss';
import {
    ErrorOutline as ErrorIcon,
    Close as CloseIcon
} from '@material-ui/icons';

interface Props {
    margin?: string;
    noticeState: string;
    padding?: string;
    text: string;
    timeStamp: number;
}

function Notice(props: Props) {
    const noticeRef = useRef<HTMLDivElement>(null!);
    const noticeContentRef = useRef<HTMLDivElement>(null!);
    const [height, setHeight] = useState(0);
    const close = () => {
        noticeRef.current.style.opacity = '0';
        setTimeout(() => {
            if (noticeRef.current) noticeRef.current.style.height = '0px';
        }, 240);
    }

    useEffect(() => {
        const elementHeight = noticeContentRef.current.getBoundingClientRect().height;
        setHeight(elementHeight);
    }, []);

    useEffect(() => {
        if (noticeRef.current) noticeRef.current.style.opacity = '0';
        noticeRef.current.style.height = height + 'px';
        setTimeout(() => {
            if (noticeRef.current && height !== 0) noticeRef.current.style.opacity = '1';
        }, 230);
    }, [props.timeStamp, height]);

    useLayoutEffect(() => {
        const noticeContentHeight = noticeContentRef.current.getBoundingClientRect().height;
        setHeight(noticeContentHeight);
    }, [props.text, props.noticeState])

    useEffect(() => {
        if (props.noticeState === 'hidden') {
            setHeight(0);
        }
    }, [props.noticeState])

    return (
        <div className={`Notice ${props.margin}`} ref={noticeRef}>
            <div className={`${props.padding || ''}`} ref={noticeContentRef}>
                <div className={`notice--content padding-left-right-15 padding-top-bottom-10 ${props.noticeState}`} onClick={close}>
                    <ErrorIcon className="notice--icon" />
                    <span className="notice--text ">{props.text}</span>
                    <CloseIcon className="notice--close--icon" />
                </div>
            </div>
        </div>
    )
}

export default Notice;