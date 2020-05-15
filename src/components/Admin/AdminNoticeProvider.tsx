import React, {useState} from 'react';

interface Props {
    children: JSX.Element | Array<JSX.Element>
}

interface ContextInterface {
    noticeState: 'hidden' | 'success' | 'error';
    noticeText: string;
    noticeTimeStamp: number;
    setNoticeState(state: 'hidden' | 'success' | 'error'): void;
    setNoticeText(text:  string): void;
    setNoticeTimestamp(timeStamp: number): void;
}

function AdminNoticeProvider(props: Props) {   
    const [noticeState, setNoticeState] = useState<'hidden' | 'success' | 'error'>('hidden')
    const [noticeText, setNoticeText] = useState<string>('');
    const [noticeTimeStamp, setNoticeTimeStamp] = useState<number>(0);

    const state = {
        noticeState: noticeState,
        noticeText: noticeText,
        noticeTimeStamp: noticeTimeStamp,
        setNoticeState: setNoticeState,
        setNoticeText: setNoticeText,
        setNoticeTimestamp: setNoticeTimeStamp
    }

    return (
        <AdminNoticeContext.Provider value={state}>
            {props.children}
        </AdminNoticeContext.Provider>
    )
}

export const AdminNoticeContext = React.createContext<ContextInterface>(null!);
export default AdminNoticeProvider;