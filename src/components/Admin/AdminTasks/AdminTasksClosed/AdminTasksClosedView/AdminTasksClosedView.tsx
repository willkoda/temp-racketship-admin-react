import React, {useEffect, useState} from 'react';
import Container from '../../../../../elements/Container/Container';

import Timeline from '../../../../../elements/Timeline/Timeline';
import axios from '../../../../../auxiliary/axios';

import {useParams, useHistory} from 'react-router-dom';
import {RequestData, Activity} from '../../AdminTasks';
import {formatName} from '../../../../../auxiliary/functions/format-name';

import camera from '../../../../../assets/images/camera.svg';
import chip from '../../../../../assets/images/chip.svg';
import lock from '../../../../../assets/images/lock.svg';
import unlock from '../../../../../assets/images/unlock.svg';
import hand from '../../../../../assets/images/hand.svg';
import safetyDepositBox from '../../../../../assets/images/safety-deposit-box.svg';

import { 
    VerifiedUser as VerifiedUserIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Flag as FlagIcon
} from '@material-ui/icons';

function AdminTasksClosedView() {
    const {requestType, id} = useParams();
    const history = useHistory();
    const [request, setRequest] = useState<RequestData>(null!);
    const [activities, setActivities] = useState<Array<Activity>>([]);
    
    useEffect(() => {
        const requestTypes = ['withdrawal_request', 'purchase_request'];
        if (!requestTypes.includes(requestType) || !id) {
            history.replace('/error');
        }

        const init = async () => { // refactor
            try {
                const response = await axios.get(`/v1/${requestType}s/${id}`);
                const {amount, reference_number, bank_account, user, organization, handler, notes, image_url, linked_account} = response.data;
                const transactionHistory = user.transaction_history ? user.transaction_history : {
                    failed: {count: 'N/A', total: 'N/A'},
                    success: {count: 'N/A', total: 'N/A'},
                    unconfirmed: {count: 'N/A', total: 'N/A'}
                }
                const {failed, success, unconfirmed} = transactionHistory;
                setRequest({
                    id: response.data.id,
                    amount: amount,
                    referenceNumber: reference_number,
                    bankAccount: {
                        id: bank_account.id,
                        accountName: bank_account.account_name,
                        accountNumber: bank_account.account_number,
                        bankName: bank_account.bank_name
                    },
                    handler: handler ? {
                        id: handler.id,
                        firstName: handler.first_name,
                        lastName: handler.last_name
                    } : undefined,
                    linkedAccount: {
                        gameId: linked_account.game_id,
                        userName: linked_account.username
                    },
                    imageUrl: image_url,
                    notes: notes,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        mobileNumber: user.mobile_number,
                        transactionHistory: {
                            failed: {
                                count: failed.count,
                                total: failed.total
                            },
                            success: {
                                count: success.count,
                                total: success.total
                            },
                            unconfirmed: {
                                count: unconfirmed.count,
                                total: unconfirmed.total
                            }
                        }
                    },
                    organization: {
                        id: organization.id,
                        identifier: organization.identifier,
                        name: organization.name
                    }
                })
            } catch(error) {
                console.log(error)
                history.replace('/error');
            }
        }
        init();
    }, [requestType, id, history]);

    useEffect(() => {
        const init = async () => {
            const response = await axios.get(`/v1/${requestType}s/${id}/activity`);
            const {activities} = response.data;
            setActivities(activities);
        };
        init();    
    }, [id, requestType])

    return (
        <Container paddingOnly={true}>
            <div className="AdminTasksClosedView">
                <h2 className="overview--heading">Task Overview</h2>
                <div className="overview--boxes padding-bottom-10">
                    <div className="box">
                        <h3 className="box--heading">Request Details</h3>
                        <div className="box--details">
                            <div className="box--row">
                                <div className="key">Reference Number:</div>
                                <div className="value">{request?.referenceNumber}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Bank:</div>
                                <div className="value">{request?.bankAccount.bankName}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Bank Account:</div>
                                <div className="value">{request?.bankAccount.accountNumber}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Amount:</div>
                                <div className="value">{request?.amount}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Sender's Name:</div>
                                <div className="value">{formatName(request?.user.firstName || '', request?.user.lastName || '')}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club Name:</div>
                                <div className="value">{request?.organization.name}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club ID:</div>
                                <div className="value">{request?.organization.identifier}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">In Game Account:</div>
                                <div className="value">{request?.linkedAccount?.userName}({request?.linkedAccount?.gameId})</div>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <h3 className="box--heading">Timeline</h3>
                        <div className="box--details">
                            <div className="padding-left-15">
                                <Timeline
                                    timeLineItems={
                                        activities.map(el => {
                                            let action = el.key.split('.')[1].split('_').join(' ');
                                            let content = `${action.charAt(0).toUpperCase() + action.slice(1)} by ${formatName(el.owner.first_name , el.owner.last_name)}`;
                                            let iconElement;
                                            
                                            switch(action) {
                                                case 'chips sent':
                                                    iconElement = <img src={chip} alt="chips sent" />
                                                    break;
                                                case 'chips taken':
                                                    iconElement = <img src={hand} alt="take chips" />
                                                    break;
                                                case 'completed':
                                                    iconElement = <CheckIcon style={{color: 'var(--status--success--color)'}} />
                                                    break;
                                                case 'flagged':
                                                    iconElement = <FlagIcon />
                                                    break;
                                                case 'locked':
                                                    iconElement = <img src={lock} alt="locked" />
                                                    break;
                                                case 'deposit sent':
                                                    iconElement = <img src={safetyDepositBox} alt="safety-deposit-box" />
                                                    break;
                                                case 'set as failed':
                                                    iconElement = <CloseIcon />
                                                    break;
                                                case 'screenshot verified':
                                                    iconElement = <img src={camera} alt="screenshot verified" />
                                                    break;
                                                case 'unlocked':
                                                    iconElement = <img src={unlock} alt="unlocked" />
                                                    break;
                                                default:
                                                    iconElement = <VerifiedUserIcon />
                                            }

                                            return {
                                                date: el.timestamp,
                                                content: content,
                                                iconElement: iconElement
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </Container>
    )
}

export default AdminTasksClosedView;