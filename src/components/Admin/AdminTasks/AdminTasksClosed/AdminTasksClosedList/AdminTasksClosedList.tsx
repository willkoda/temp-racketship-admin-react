import React, {useEffect,  useState, useRef, useContext} from 'react';
import Container from '../../../../../elements/Container/Container';
import axios from '../../../../../auxiliary/axios';
import Table from '../../../../../elements/Table/Table';
import {useParams, useHistory} from 'react-router-dom';
import {Task, Pagination} from '../../AdminTasks';
import {formatDate} from '../../../../../auxiliary/functions/format-date';
import {formatName} from '../../../../../auxiliary/functions/format-name';
import {AdminNoticeContext} from '../../../AdminNoticeProvider';

import {compose} from 'redux';
import {user} from '../../../../../auxiliary/state';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {UserStateInterface} from '../../../../../redux/reducers/user-reducer';

import {
    AttachMoney as AttachMoneyIcon,
    SyncAlt as SyncAltIcon,
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon
} from '@material-ui/icons';

interface Props {
    user: UserStateInterface
}

function AdminTasksClosedList(props: Props) {
    const adminNotice = useContext(AdminNoticeContext);
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, tasks: [], progressIndicatorVisible: true};
    const [tasks, setTasks] = useState<{pagination: Pagination, tasks: Array<Task>,  progressIndicatorVisible: boolean}>({...initialData});
    const componentRef = useRef<HTMLDivElement>(null!);
    const history = useHistory();
    const {page} = useParams();
    useEffect(() => {
        const init = async () => {
            const response = await axios.get(`/v1/tasks/closed?page=${page ? page : '1'}`);
            const {tasks, pagination} = response.data;
            if (componentRef.current) setTasks({tasks: tasks, pagination: pagination, progressIndicatorVisible: false});
        }
        init();
    }, [page])

    return (
        <div className="AdminTasksClosedList" style={{height: 'inherit'}} ref={componentRef}>
            <Container paddingOnly={true}>
                <Table
                    tableName={
                        <div className="table--name">
                            <span style={{
                                backgroundColor: 'var(--status--requested--background)',
                                color: 'var(--status--requested--color)',
                                }}>
                                Closed Tasks
                            </span>
                        </div>
                    } 
                    headers={['ID', 'Date', 'Club', 'Task', 'Member', 'Account', 'Notes', 'Status', 'Locked by']}
                        content={
                            tasks.tasks.map(el => [
                                el.id,
                                formatDate(el.request.created_at),
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
                                <div>{formatName(el.request.user.first_name, el.request.user.last_name)}</div>,
                                `${el.request.linked_account.username} (${el.request.linked_account.game_id})`,
                                el.request.notes,
                                (() => {
                                    const textWithIcon = {
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--status--success--color)'
                                    }
                                    switch (el.request.status) {
                                        case 'completed':
                                            return (
                                                <span style={textWithIcon}>
                                                    <CheckCircleIcon className="margin-right-5" />
                                                    <span>Success</span>
                                                </span>
                                            )
                                        case 'failed':
                                            return (
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'var(--dark-red)'
                                                }}>
                                                    <CloseIcon className="margin-right-5" />
                                                    <span>Failed</span>
                                                </span>
                                            )
                                        default: 
                                            return ''
                                    }
                                })(),
                                (() => {
                                    if (!el.request.handler) return '-';
                                    const {first_name, last_name} = el.request.handler;
                                    return <div className="status verified">
                                        {formatName(first_name, last_name)}
                                    </div>
                                    
                                })()
                            ])
                        }
                        tableRowClickHandler={(rowIndex: number) => {
                            const targetTask = tasks.tasks[rowIndex];
                            const {type, request} = targetTask;
                            history.push(`/dashboard/tasks/closed/view/${type}/${request.id}`);
                        }}
                        nextPageClickHandler={
                            async () => {
                                setTasks({...tasks, progressIndicatorVisible: true});
                                const response = await axios.get(`/v1/tasks/closed?page=${tasks.pagination.current + 1}`);

                                const {pagination} = response.data;
                                if (componentRef.current) {
                                    setTasks({pagination: pagination, tasks: response.data.tasks, progressIndicatorVisible: false});
                                    history.replace(`/dashboard/tasks/closed/${tasks.pagination.current + 1}`)
                                }
                            }
                        }
                        previousPageClickHandler={
                            async () => {
                                setTasks({...tasks, progressIndicatorVisible: true});
                                const response = await axios.get(`/v1/tasks/closed?page=${tasks.pagination.current - 1}`);
                                const {pagination} = response.data;
                                if (componentRef.current) {
                                    setTasks({pagination: pagination, tasks: response.data.tasks, progressIndicatorVisible: false});
                                    history.replace(`/dashboard/tasks/closed/${tasks.pagination.current - 1}`)
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
            </Container>
        </div>
    )
}

export default compose(
    withStoreConnection({stateProps: [user]})
)(AdminTasksClosedList);