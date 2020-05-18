import React, {useState, useRef, useEffect} from 'react';
import Table from '../../../../../elements/Table/Table';
import axios from '../../../../../auxiliary/axios';
import IconButton from '../../../../../elements/IconButton/IconButton';
import Container from '../../../../../elements/Container/Container';

import {
    AttachMoney as AttachMoneyIcon,
    SyncAlt as SyncAltIcon,
    Visibility as VisibilityIcon,
    Lock as LockIcon,
    LockOpen as LockOpenIcon
} from '@material-ui/icons';

interface Pagination {
    pages: number;
    count: number;
    current: number;
}

interface Tasks {
    id: number;
    type: string;
    request: {
        created_at: string;
        status: string;
        notes: string;
        handler: string | undefined;
        organization: {
            name: string;
        };
        user: {
            first_name: string;
            last_name: string;
        }
    }
}

function AdminTasksAvailableList() {
    const componentRef = useRef<HTMLDivElement>(null!);
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, tasks: [], progressIndicatorVisible: true};
    const [tasks, setTasks] = useState<{pagination: Pagination, tasks: Array<Tasks>,  progressIndicatorVisible: boolean}>({...initialData});

    useEffect(() => {
        (async function () {
            const response = await axios.get('/v1/tasks?page=1');
            const {tasks, pagination} = response.data;
            if (componentRef.current) setTasks({tasks: tasks, pagination: pagination, progressIndicatorVisible: false});
        })()
    }, [])

    const getDateMonth = (month: number) => {
        switch(month) {
            case 1:
                return 'January'
            case 2:
                return 'February'
            case 3:
                return 'March'
            case 4:
                return 'April'
            case 5:
                return 'May'
            case 6:
                return 'June'
            case 7:
                return 'July'
            case 8:
                return 'August'
            case 9:
                return 'September'
            case 10:
                return 'October'
            case 11:
                return 'November'
            case 12:
                return 'December'
            default:
                throw new Error(`${month} is not a valid month number`);
        }
    }

    const transformDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${getDateMonth(date.getMonth() + 1)} ${date.getDate()}, ${date.getFullYear()}`;
    }

    return (
        <div className="AdminTasksAvailableList" style={{height: 'inherit'}}>
            <Container paddingOnly={true}>
                <div className="AdminTasksAvailable" ref={componentRef}>
                    <Table 
                        headers={['ID', 'Date', 'Club', 'Task', 'Description', 'Notes', 'Locked by', 'Actions']}
                        content={
                            tasks.tasks.map(el => [
                                el.id,
                                transformDate(el.request.created_at),
                                el.request.organization.name,
                                (() => {
                                    switch(el.type) {
                                        case 'purchase_request':
                                            return (
                                                <div className="key--value--pair">
                                                    <span style={{color: 'var(--status--success--color)'}}><AttachMoneyIcon /></span>
                                                    <span>Purchase Request</span>
                                                </div>
                                            )
                                        case 'withdrawal_request':
                                            return (
                                                <div className="key--value--pair">
                                                    <span style={{color: 'var(--status--requested--color)'}}><SyncAltIcon /></span>
                                                    <span>Withdrawal Request</span>
                                                </div>
                                            )
                                    }
                                })(),
                                (() => {
                                    const firstName = el.request.user.first_name;
                                    const lastName = el.request.user.last_name;
                                    const fullName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`
                                    switch (el.request.status) {
                                        case 'requested':
                                            return `Verify bank transfer screenshot from ${fullName}`
                                        case 'locked':
                                            return `Verify bank transfer screenshot from ${fullName}`
                                        case 'verified':
                                            return `Send chips to ${fullName}`
                                        case 'chips_sent':
                                            return `Mark complete`
                                        case 'flagged':
                                            return `Review bank transfer from ${fullName}`
                                        default: 
                                            return ''
                                    }
                                })(),
                                el.request.notes,
                                el.request.handler || '-',
                                <div className="action--buttons">
                                    <IconButton 
                                        color="var(--accent-one-shade-two)"
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        iconElement={<VisibilityIcon />} 
                                        clickHandler={() => console.log('view this')} />

                                    <IconButton
                                        color={el.request.handler ? 'var(--dark-red)' : "var(--status--success--color)"}
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        iconElement={el.request.handler ? <LockIcon /> : <LockOpenIcon />} 
                                        clickHandler={() => console.log('view this')} />
                                </div>
                            ])
                        }
                        nextPageClickHandler={
                            async () => {
                                setTasks({...tasks, progressIndicatorVisible: true});
                                const response = await axios.get(`/v1/tasks?page=${tasks.pagination.current + 1}`);
                                const {pagination} = response.data;
                                if (componentRef.current) {
                                    setTasks({pagination: pagination, tasks: response.data.tasks, progressIndicatorVisible: false});
                                }
                            }
                        }
                        previousPageClickHandler={
                            async () => {
                                setTasks({...tasks, progressIndicatorVisible: true});
                                const response = await axios.get(`/v1/tasks?page=${tasks.pagination.current - 1}`);
                                const {pagination} = response.data;
                                if (componentRef.current) {
                                    setTasks({pagination: pagination, tasks: response.data.tasks, progressIndicatorVisible: false});
                                }
                            }
                        }
                        progressIndicatorVisible={tasks.progressIndicatorVisible}
                        pagination={{
                            pages: tasks.pagination.pages,
                            currentPage: tasks.pagination.current,
                            totalCount: tasks.pagination.count
                        }}
                    />
                </div>
            </Container>
        </div>
    )
}

export default AdminTasksAvailableList;