import React, {useEffect, useState, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../../../../auxiliary/axios';
import Container from '../../../../../elements/Container/Container';
import {formatName} from '../../../../../auxiliary/functions/format-name';

interface RequestData {
    referenceNumber: string;
    bankAccount: {
        accountName: string;
        accountNumber: string;
        bankName: string;
    };
    user: {
        email: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
    };
    organization: {
        identifier: string;
        name: string;
    };
}

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
                const {reference_number, bank_account, user, organization} = response.data;
                setRequest({
                    referenceNumber: reference_number,
                    bankAccount: {
                        accountName: bank_account.account_name,
                        accountNumber: bank_account.account_number,
                        bankName: bank_account.bank_name
                    },
                    user: {
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        mobileNumber: user.mobile_number
                    },
                    organization: {
                        identifier: organization.identifier,
                        name: organization.name
                    }
                })
                console.log(response);
            } catch(error) {
                history.replace('/error');
            }
        })()
    }, [request_type, history])

    return (
        <Container paddingOnly={true}>
            <div className="AdminTasksAvailableView">
                <h2 className="overview--heading">Member Overview</h2>
                <div className="overview--boxes">
                    <div className="box padding-bottom-10" style={{flex: request_type === 'purchase_request' ? '0 1 49%' : '0 1 100%'}}>
                        <h3 className="box--heading">
                            {request_type === 'purchase_request' ? 'Verify Bank Transfer' : 'Send Deposit'}
                        </h3>
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
                                <div className="key">User's Name:</div>
                                <div className="value">
                                    {
                                        (() => {
                                            if (!request) return '';
                                            return formatName(request.user.firstName, request.user.lastName)
                                        })()
                                    }
                                </div>
                            </div>
                            <div className="box--row">
                                <div className="key">User's Email:</div>
                                <div className="value">{request?.user.email}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">User's Number:</div>
                                <div className="value">{request?.user.mobileNumber}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club Name:</div>
                                <div className="value">{request?.organization.name}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club ID:</div>
                                <div className="value">{request?.organization.identifier}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminTasksAvailableView;