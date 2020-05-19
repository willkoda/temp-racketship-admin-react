import React, {useEffect, useState} from 'react';
import './AdminTasksAvailableView.scss';
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../../../../auxiliary/axios';
import Container from '../../../../../elements/Container/Container';

import AdminTasksAvailableViewPurchase from './AdminTasksAvailableViewPurchase/AdminTasksAvailableViewPurchase';

function AdminTasksAvailableView() {
    const {request_type, id} = useParams();
    const history = useHistory();
    const [request, setRequest] = useState<RequestData>(null!);
    useEffect(() => {
        const requestTypes = ['withdrawal_request', 'purchase_request'];
        if (!requestTypes.includes(request_type) || !id) {
            history.replace('/error');
        }

        (async () => {
            try {
                const response = await axios.get(`/v1/${request_type}s/${id}`);
                const {reference_number, bank_account, user, organization, handler} = response.data;
                const transactionHistory = user.transaction_history ? user.transaction_history : {
                    failed: {count: 'N/A', total: 'N/A'},
                    success: {count: 'N/A', total: 'N/A'},
                    unconfirmed: {count: 'N/A', total: 'N/A'}
                }
                const {failed, success, unconfirmed} = transactionHistory;
                setRequest({
                    referenceNumber: reference_number,
                    bankAccount: {
                        accountName: bank_account.account_name,
                        accountNumber: bank_account.account_number,
                        bankName: bank_account.bank_name
                    },
                    handler: handler ? {
                        id: handler.id,
                        firstName: handler.first_name,
                        lastName: handler.last_name
                    } : undefined,
                    user: {
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
                        identifier: organization.identifier,
                        name: organization.name
                    }
                })
            } catch(error) {
                console.log(error)
                history.replace('/error');
            }
        })()
    }, [request_type, id, history])

    const renderTemplate = () => {
        return request_type === 'purchase_request' ? 
            <AdminTasksAvailableViewPurchase request={request} requestType={request_type} /> 
                :
            <div>withdrawal request under construction</div>
    }

    return (
        <Container paddingOnly={true}>
            {renderTemplate()}
        </Container>
    )
}

export interface RequestData {
    referenceNumber: string;
    bankAccount: {
        accountName: string;
        accountNumber: string;
        bankName: string;
    };
    handler?: {
        id: number;
        firstName: string;
        lastName: string;
    };
    user: {
        email: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
        transactionHistory: {
            failed: {
                count: number;
                total: number;
            }
            success: {
                count: number;
                total: number;
            }
            unconfirmed: {
                count: number;
                total: number;
            }
        }
    };
    organization: {
        identifier: string;
        name: string;
    };
}

export default AdminTasksAvailableView;