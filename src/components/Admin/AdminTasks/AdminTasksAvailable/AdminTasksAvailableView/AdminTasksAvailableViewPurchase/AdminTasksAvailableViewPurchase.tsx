import React, {useContext} from 'react';
import './AdminTasksAvailableViewPurchase.scss';
import {RequestData} from '../AdminTasksAvailableView';
import {formatName} from '../../../../../../auxiliary/functions/format-name';
import Button from '../../../../../../elements/Button/Button';
import axios from '../../../../../../auxiliary/axios';
import {AdminNoticeContext} from '../../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../../AdminModalProvider';
import IconButton from '../../../../../../elements/IconButton/IconButton';
import noteImage from '../../../../../../assets/images/note.svg';
import AdminTasksAvailableViewPurchaseNote from './AdminTasksAvailableViewPurchaseNote/AdminTasksAvailableViewPurchaseNote';

interface Props {
    requestType: string;
    request: RequestData;
    callbacks: {
        lockTask(request: RequestData): void;
        updateNote(request: RequestData): void;
    }
}

function AdminTasksAvailableViewPurchase({requestType, request, callbacks}: Props) {
    const adminNotice = useContext(AdminNoticeContext);
    const adminModal = useContext(AdminModalContext);

    return (
        <div className="AdminTasksAvailableViewPurchase">
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
                        <h3 className="box--heading">
                            <span>Task Notes</span>
                            <div className="button--container" style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}>
                                <IconButton
                                    showToolTip={true}
                                    toolTip="Edit Note"
                                    iconElement={<img src={noteImage} style={{height: '25px'}} alt=""/>}
                                    waveColor="rgba(0, 0, 0, 0.2)"
                                    clickHandler={
                                        () => {
                                            adminModal.setModalData({
                                                header: 'Edit Notes',
                                                content: <AdminTasksAvailableViewPurchaseNote updateNotesCallback={callbacks.updateNote} request={request} />,
                                                confirmationText: 'Submit'
                                            })
                                            adminModal.toggleModal();
                                        }
                                    }
                                />
                            </div>
                        </h3>
                        {
                            request?.handler ? 
                            <div className="box--details">
                                <div className="request--notes padding-20">
                                    {
                                        request.notes.length === 0 ? 'There are no notes for this task.' : request.notes
                                    }
                                </div>
                            </div>
                            : 
                            <div className="box--details">
                                <div className="lock--task">
                                    <span>This task has not been locked by anyone. Please lock this task before adding some notes</span>
                                    <div className="margin-top-10">
                                        <Button 
                                            text="Lock Task" 
                                            color="#fff"
                                            waveColor="rgba(0, 0, 0, 0.2)"
                                            backgroundColor="accent--three"
                                            width="120px"
                                            clickCallback={
                                                async () => {
                                                    try {
                                                        const result = await axios.get(`/v1/${requestType}s/${request.id}/lock`);
                                                        adminNotice.setNoticeText('The task has been locked successfully');
                                                        adminNotice.setNoticeState('success');
                                                        callbacks.lockTask(result.data)
                                                        
                                                    } catch(error) {
                                                        adminNotice.setNoticeText(error.response.data.error);
                                                        adminNotice.setNoticeState('error');
                                                    } finally {
                                                        adminNotice.setNoticeTimestamp(Date.now());
                                                    }
                                                }
                                            } />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div> 
            </div>
            <section className="purchase--screenshot">
                <div className="overview--boxes">
                    <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                        <h3 className="box--heading">
                            <span>Screenshot</span>
                            <span className="sub--heading">Verify that the screenshot below matches the details above </span>
                        </h3>
                        <div className="box--details">
                            <img src={request?.imageUrl} style={{width: '100%'}} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminTasksAvailableViewPurchase;