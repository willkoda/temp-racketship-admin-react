import React, {useState, useRef, useEffect, useContext} from 'react';
import Table from '../../../../../elements/Table/Table';
import axios from '../../../../../auxiliary/axios';
import IconButton from '../../../../../elements/IconButton/IconButton';
import Container from '../../../../../elements/Container/Container';

import {compose} from 'redux';
import {user} from '../../../../../auxiliary/state';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {UserStateInterface} from '../../../../../redux/reducers/user-reducer';

import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import {useHistory, useParams} from 'react-router-dom';
import {formatName} from '../../../../../auxiliary/functions/format-name';

import {Task, Pagination} from '../../AdminTasks';

import chip from '../../../../../assets/images/chip.svg';

import {
    AttachMoney as AttachMoneyIcon,
    SyncAlt as SyncAltIcon,
    Visibility as VisibilityIcon,
    Lock as LockIcon,
    LockOpen as LockOpenIcon,
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons';

interface Props {
    user: UserStateInterface
}

function AdminTasksAvailableList(props: Props) {
    const adminNoticeContext = useContext(AdminNoticeContext);
    const componentRef = useRef<HTMLDivElement>(null!);
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, tasks: [], progressIndicatorVisible: true};
    const [tasks, setTasks] = useState<{pagination: Pagination, tasks: Array<Task>,  progressIndicatorVisible: boolean}>({...initialData});
    const history = useHistory();
    const {page} = useParams();
    useEffect(() => {
        (async function () {
            const response = await axios.get(`/v1/tasks?page=${page ? page : '1'}`);
            const {tasks, pagination} = response.data;
            if (componentRef.current) setTasks({tasks: tasks, pagination: pagination, progressIndicatorVisible: false});
        })()
    }, [page])

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
                                    const fullName = formatName(el.request.user.first_name, el.request.user.last_name);
                                    const textWithIcon = {
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--status--success--color)'
                                    }
                                    switch (el.request.status) {
                                        case 'requested':
                                            return `Verify bank transfer screenshot from ${fullName}`
                                        case 'locked':
                                            return `Verify bank transfer screenshot from ${fullName}`
                                        case 'verified':
                                            return (
                                                <span style={textWithIcon}>
                                                    <img src={chip} alt="" style={{height: '24px'}} className="margin-right-5"/>
                                                    <span>{`Send chips to ${fullName}`}</span>
                                                </span>
                                            )
                                        case 'chips_sent':
                                            return (
                                                <span style={textWithIcon}>
                                                    <CheckCircleIcon className="margin-right-5" />
                                                    <span>Mark Complete</span>
                                                </span>
                                            )
                                        case 'flagged':
                                            return `Review bank transfer from ${fullName}`
                                        default: 
                                            return ''
                                    }
                                })(),
                                el.request.notes,
                                (() => {
                                    if (!el.request.handler) return '-';
                                    const {first_name, last_name} = el.request.handler;
                                    return <div className="status verified">
                                        {formatName(first_name, last_name)}
                                    </div>
                                    
                                })(),
                                <div className="action--buttons">
                                    <IconButton 
                                        color="var(--accent-one-shade-two)"
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        iconElement={<VisibilityIcon />} 
                                        clickHandler={() => {
                                            switch (el.request.status) {
                                                case 'verified':
                                                    history.push(`/dashboard/tasks/available/send-chips/${el.request.id}`);
                                                    break;
                                                default:
                                                    history.push(`/dashboard/tasks/available/view/${el.type}/${el.request.id}`);        
                                            }
                                        }} />

                                    <IconButton
                                        color={el.request.handler ? el.request.handler.id === props.user.id ? "var(--status--success--color)" : 'var(--dark-red)' : "var(--status--success--color)"}
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        iconElement={
                                            el.request.handler ? <LockIcon /> : <LockOpenIcon />
                                        } 
                                        clickHandler={
                                            async () => {
                                                try {
                                                    const result = await axios.get(`/v1/${el.type}s/${el.request.id}/${el.request.handler ? 'unlock' : 'lock'}`);
                                                    const tasksClone = [...tasks.tasks];
                                                    const index = tasksClone.findIndex(task => task.request.id === el.request.id);
                                                    tasksClone.splice(index, 1, {
                                                        ...tasksClone[index],
                                                        request: {
                                                            ...tasksClone[index].request,
                                                            handler: result.data.handler
                                                        }
                                                    });
                                                    setTasks({...tasks, tasks: tasksClone});
                                                    
                                                    adminNoticeContext.setNoticeText(el.request.handler ? 'The task has been unlocked succesfully' : 'The task has been locked succesfully');
                                                    adminNoticeContext.setNoticeState('success');
                                                } catch(error) {
                                                    adminNoticeContext.setNoticeText(error.response.data.error);
                                                    adminNoticeContext.setNoticeState('error');
                                                } finally {
                                                    adminNoticeContext.setNoticeTimestamp(Date.now());
                                                }
                                            }
                                        } />
                                </div>
                            ])
                        }
                        tableRowClickHandler={(rowIndex: number) => {
                            const targetTask = tasks.tasks[rowIndex];
                            switch (targetTask.request.status) {
                                case 'verified':
                                    history.push(`/dashboard/tasks/available/send-chips/${targetTask.request.id}`);
                                    break;
                                default:
                                    history.push(`/dashboard/tasks/available/view/${targetTask.type}/${targetTask.request.id}`);        
                            }
                        }}
                        nextPageClickHandler={
                            async () => {
                                setTasks({...tasks, progressIndicatorVisible: true});
                                const response = await axios.get(`/v1/tasks?page=${tasks.pagination.current + 1}`);
                                const {pagination} = response.data;
                                if (componentRef.current) {
                                    setTasks({pagination: pagination, tasks: response.data.tasks, progressIndicatorVisible: false});
                                    history.replace(`/dashboard/tasks/available/${tasks.pagination.current + 1}`)
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
                                    history.replace(`/dashboard/tasks/available/${tasks.pagination.current - 1}`)
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

export default compose(
    withStoreConnection({stateProps: [user]})
)(AdminTasksAvailableList);