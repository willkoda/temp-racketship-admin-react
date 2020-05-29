import React, {useEffect, useState} from 'react';
import './AdminTasksAvailableView.scss';
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../../../../auxiliary/axios';
import Container from '../../../../../elements/Container/Container';
import {RequestData} from '../../AdminTasks';

import AdminTasksAvailableViewPurchase from './AdminTasksAvailableViewPurchase/AdminTasksAvailableViewPurchase';
import AdminTasksAvailableViewWithdrawal from './AdminTasksAvailableViewWithdrawal/AdminTasksAvailableViewWithdrawal';

function AdminTasksAvailableView() {
    const {requestType, id} = useParams();
    const history = useHistory();
    const [request, setRequest] = useState<RequestData>(null!);
    useEffect(() => {
        const requestTypes = ['withdrawal_request', 'purchase_request'];
        if (!requestTypes.includes(requestType) || !id) {
            history.replace('/error');
        }

        (async () => { // refactor
            try {
                const response = await axios.get(`/v1/${requestType}s/${id}`);
                const {
                    amount, chips, reference_number, bank_account,
                    user, organization, handler, notes, image_url,
                    linked_account, status
                } = response.data;
                const transactionHistory = user.transaction_history ? user.transaction_history : {
                    failed: {count: 'N/A', total: 'N/A'},
                    success: {count: 'N/A', total: 'N/A'},
                    unconfirmed: {count: 'N/A', total: 'N/A'}
                }
                const {failed, success, unconfirmed} = transactionHistory;
                setRequest({
                    id: response.data.id,
                    amount: amount,
                    chips: chips,
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
                    },
                    status: status
                })
            } catch(error) {
                console.log(error)
                history.replace('/error');
            }
        })()
    }, [requestType, id, history])

    const renderTemplate = () => {
        return requestType === 'purchase_request' ? 
            <AdminTasksAvailableViewPurchase 
                request={request}
                requestType={requestType}
                callbacks={{
                    lockTask: (lockedRequest) => {
                        setRequest({
                            ...request,
                            handler: lockedRequest.handler
                        })
                    },
                    updateNote: (requestWithUpdateNote) => {
                        setRequest({
                            ...request,
                            notes: requestWithUpdateNote.notes
                        })
                    }
                }}
                /> 
                :
            <AdminTasksAvailableViewWithdrawal
                request={request}
                callbacks={{
                    lockTask: (lockedRequest) => {
                        setRequest({
                            ...request,
                            handler: lockedRequest.handler
                        })
                    },
                    updateRequestStatus: (newStatus) => {
                        setRequest({
                            ...request,
                            status: newStatus
                        })
                    }
                }}
            />
    }

    return (
        <Container paddingOnly={true}>
            {renderTemplate()}
        </Container>
    )
}

export default AdminTasksAvailableView;