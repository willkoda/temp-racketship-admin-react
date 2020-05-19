import React from 'react';
import './AdminTasksAvailableViewPurchase.scss';
import {RequestData} from '../AdminTasksAvailableView';
import {formatName} from '../../../../../../auxiliary/functions/format-name';
import Button from '../../../../../../elements/Button/Button';

interface Props {
    requestType: string;
    request: RequestData;
}

function AdminTasksAvailableViewPurchase({requestType, request}: Props) {
    return (
        <div className="AdminTasksAvailableViewPurchase">
            <div className="AdminTasksAvailableView">
                <h2 className="overview--heading">Verify Bank Transfer</h2>
                <div className="overview--boxes">
                    <div className="box padding-bottom-10">
                        <h3 className="box--heading">
                            {requestType === 'purchase_request' ? 'Verify Bank Transfer' : 'Send Deposit'}
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

                    <div className="request--details padding-bottom-10">
                        <div className="box">
                            <h3 className="box--heading">Transaction History</h3>
                            <div className="box--details">
                                <div className="box--row">
                                    <div className="key">Successful:</div>
                                    <div className="value">
                                        {
                                            (() => {
                                                if (!request) return '';
                                                const success = request.user.transactionHistory.success;
                                                return `${success.count} / ${success.total}`;
                                            })()
                                        }
                                    </div>
                                </div>
                                <div className="box--row">
                                    <div className="key">Failed:</div>
                                    <div className="value">
                                        {
                                            (() => {
                                                if (!request) return '';
                                                const failed = request.user.transactionHistory.failed;
                                                return `${failed.count} / ${failed.total}`;
                                            })()
                                        }
                                    </div>
                                </div>
                                <div className="box--row">
                                    <div className="key">Unconfirmed:</div>
                                    <div className="value">
                                        {
                                            (() => {
                                                if (!request) return '';
                                                const unconfirmed = request.user.transactionHistory.unconfirmed;
                                                return `${unconfirmed.count} / ${unconfirmed.total}`;
                                            })()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="box">
                            <h3 className="box--heading">Task Notes</h3>
                            {
                                request?.handler ? <div>add notes under construction</div> : <div className="box--details">
                                    <div className="lock--task">
                                        <span>This task has not been locked by anyone. Please lock this task before adding some notes</span>
                                        <div className="margin-top-10">
                                            <Button text="Lock Task" color="#fff" waveColor="rgba(0, 0, 0, 0.2)" backgroundColor="accent--three" width="120px" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default AdminTasksAvailableViewPurchase;