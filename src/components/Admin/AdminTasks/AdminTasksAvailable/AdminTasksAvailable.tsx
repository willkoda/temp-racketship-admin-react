import React, {useEffect, useState, useRef} from 'react';
import Container from '../../../../elements/Container/Container';
import Table from '../../../../elements/Table/Table';
import axios from '../../../../auxiliary/axios';

import {
    AttachMoney as AttachMoneyIcon,
    SyncAlt as SyncAltIcon
} from '@material-ui/icons';

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

interface Pagination {
    pages: number;
    count: number;
    current: number;
}

function AdminTasksAvailable() {
    const componentRef = useRef<HTMLDivElement>(null!);
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, tasks: [], progressIndicatorVisible: true};
    const [tasks, setTasks] = useState<{pagination: Pagination, tasks: Array<Tasks>,  progressIndicatorVisible: boolean}>({...initialData});

    useEffect(() => {
        (async function () {
            const response = await axios.get('/v1/tasks?page=1');
            const {tasks, pagination} = response.data;
            console.log(response.data)
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
                            <div>test</div>
                            // <div className="key--value--pair">
                            //     <span style={{color: 'var(--status--success--color)'}}><AttachMoneyIcon /></span>
                            //     <span>{el.amount}</span>
                            // </div>,
                            // `${el.linked_account.username}(${el.linked_account.game_id})`,
                            // `${el.bank_account.account_name}(${el.bank_account.account_number})`,
                            // el.created_at,
                            // <div className={`status ${el.status}`}>
                            //     <span className="value">{el.status}</span>
                            // </div>
                        ])
                    }
                    nextPageClickHandler={
                        async () => {
                            // setPurchaseRequests({...purchaseRequests, progressIndicatorVisible: true})
                            // const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${purchaseRequests.pagination.current + 1}`);
                            // const {pagination, purchase_requests} = response.data;
                            // setPurchaseRequests({pagination: pagination, requests: purchase_requests, progressIndicatorVisible: false})
                        }
                    }
                    previousPageClickHandler={
                        async () => {
                            // setPurchaseRequests({...purchaseRequests, progressIndicatorVisible: true})
                            // const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${purchaseRequests.pagination.current - 1}`);
                            // const {pagination, purchase_requests} = response.data;
                            // setPurchaseRequests({pagination: pagination, requests: purchase_requests, progressIndicatorVisible: false});
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
    )
}

export default AdminTasksAvailable;