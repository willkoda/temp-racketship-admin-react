import React, {useContext, useState, useEffect} from 'react';
import {RequestData} from '../../../AdminTasks';
import {formatName} from '../../../../../../auxiliary/functions/format-name';
import Input, {ResultInterface} from '../../../../../../elements/Input/Input';
import Button from '../../../../../../elements/Button/Button';
import {AdminNoticeContext} from '../../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../../AdminModalProvider';
import AdminTasksAvailableViewWithdrawalTimeline from './AdminTasksAvailableViewWithdrawalTimeline/AdminTasksAvailableViewWithdrawalTimeline';

import Loading from '../../../../../../elements/Loading/Loading';

import axios from '../../../../../../auxiliary/axios';
import {useHistory} from 'react-router-dom';

interface InitialState {
    value: string;
    valid: boolean;
    error: string;
}

interface Props {
    request: RequestData;
    callbacks: {
        lockTask(request: RequestData): void;
        updateRequestStatus(newStatus: string): void;
    }
}

function AdminTasksAvailableViewWithdrawal({request, callbacks}: Props) {
    const adminNotice = useContext(AdminNoticeContext);
    const adminModal = useContext(AdminModalContext);
    const initialState: InitialState = {value: '', valid: false, error: ''};
    const [requestAmount,  setRequestAmount] = useState({...initialState});
    const [timeStamp, setTimeStamp] = useState(0);

    const [pageLoading, setPageLoading] = useState(false);

    const history = useHistory();
    useEffect(() => {
        const init = async () => {
            if (request) {
                setRequestAmount({
                    value: request.chips!.toString(),
                    valid: true,
                    error: ''
                })
            }
        }
        init();
    }, [request])

    const changeHandler = (result: ResultInterface) => {
        const newState = {...result};
        delete newState.origin

        switch(result.origin) {
            case 'request-amount':
                    setRequestAmount(newState)
                break;
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    }

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeStamp(Date.now())

        const requestData = {
            chips: requestAmount.value
        }

        const result = [
            requestAmount
        ].map(e => e.valid);

        if (result.every(valid => valid)) {
            try {
                await axios.patch('/v1/withdrawal_requests/' + request.id, requestData)
                adminNotice.setNoticeText('Successfully updated payment details');
                adminNotice.setNoticeState('success');
                adminNotice.setNoticeTimestamp(Date.now());
            } catch(error) {
                console.log(error.response)
                adminNotice.setNoticeText('There was a problem updating the payment details.');
                adminNotice.setNoticeState('error');
                adminNotice.setNoticeTimestamp(Date.now());
            }
        }
    }
    
    return (
        !pageLoading ? 
        <div className="AdminTasksAvailableViewWithdrawal">
            <h2 className="overview--heading">Take Chips</h2>
            <div className="overview--boxes">
                <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                    <h3 className="box--heading">
                        Take Chip
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
                            <div className="value">{request?.bankAccount.accountName}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">Chips:</div>
                            <div className="value">{request?.chips}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">User's Name:</div>
                            <div className="val">{request ? formatName(request?.user.firstName, request?.user.lastName) : ''}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">User's Email:</div>
                            <div className="val">{request?.user.email}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">User's Number:</div>
                            <div className="val">{request?.user.mobileNumber}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">Club Name:</div>
                            <div className="val">{request?.organization.name}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">Club ID:</div>
                            <div className="val">{request?.organization.identifier}</div>
                        </div>
                        <div className="box--row">
                            <div className="key">In Game Account:</div>
                            <div className="val">{request?.linkedAccount?.userName} ({request?.linkedAccount?.gameId})</div>
                        </div>
                    </div>
                </div>
            </div>

            { 
                request?.status !== 'deposit_sent' ? <section className="adjustment">
                    <div className="overview--boxes">
                        <div className="box padding--bottom-10">
                            <h3 className="box--heading">
                                <span>Adjustment</span>
                                <span className="sub--heading">If the amount entered was incorrect, please adjust it below.</span>
                            </h3>
                            <div className="box--details">
                                <form onSubmit={formSubmitHandler}>
                                    <Input
                                        margin="margin-top-20" 
                                        changeCallback={changeHandler}
                                        error={requestAmount.error}
                                        id="request-amount"
                                        initialValue={requestAmount.value}
                                        inputBorderColor="var(--accent-one-shade-one)"
                                        placeholder="Amount"
                                        timeStamp={timeStamp}
                                        validatedProps = {{
                                            numbersOnly: true
                                        }}
                                        valid={requestAmount.valid}
                                        value={requestAmount.value.toString()}
                                    />

                                    <Button 
                                        text="Submit"
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        backgroundColor="accent--three"
                                        width="120px"
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="admin--actions">
                            <div className="box padding-bottom-10">
                                <h3 className="box--heading">
                                    <span>Actions</span>
                                    {
                                        request?.handler ? 
                                            <span className="sub--heading">This task is locked by {formatName(request?.handler.firstName, request?.handler.lastName)}.</span> 
                                                : 
                                            <span className="sub--heading">Please lock this task before performing any of the actions below.</span>
                                    }
                                </h3>
                                {
                                    request?.handler ?
                                        <div className="box--details">
                                            <div className="action--buttons">
                                                {
                                                    (() => {
                                                        switch(request.status) {
                                                            case 'requested':
                                                                return (<Button 
                                                                    text="I have taken the chips" 
                                                                    color="#fff"
                                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                                    backgroundColor="accent--three"
                                                                    width="200px"
                                                                    clickCallback={
                                                                        async () => {
                                                                            try {
                                                                                setPageLoading(true);
                                                                                const response = await axios.get(`/v1/withdrawal_requests/${request.id}/take_chips`);
                                                                                callbacks.updateRequestStatus(response.data.status);

                                                                                adminNotice.setNoticeText('The chips have been taken successfully.');
                                                                                adminNotice.setNoticeState('success');
                                                                                adminNotice.setNoticeTimestamp(Date.now());
                    
                                                                            } catch(error) {
                                                                                console.log(error.response)
                                                                                adminModal.setModalData({
                                                                                    header: 'Notice',
                                                                                    content: (
                                                                                        <div className="padding-top-bottom-20">
                                                                                            <p className="padding-left-right-20 padding-bottom-20">Please lock this task before performing the action.</p>
                                                                                            <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                                                                <Button
                                                                                                    text="Ok"
                                                                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                                                                    backgroundColor="status--approved"
                                                                                                    width="120px"
                                                                                                    clickCallback={() => { adminModal.hideModal()}}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ),
                                                                                    confirmationText: 'Ok'
                                                                                });
                                                                                adminModal.toggleModal();

                                                                            } finally {
                                                                                setPageLoading(false);
                                                                            }
                                                                        }
                                                                    }
                                                                />)
                                                            case 'chips_taken':
                                                                return (<Button 
                                                                    text="I have processed the deposit" 
                                                                    color="#fff"
                                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                                    backgroundColor="accent--three"
                                                                    width="200px"
                                                                    clickCallback={
                                                                        async () => {
                                                                            try {
                                                                                setPageLoading(true);
                                                                                const response = await axios.get(`/v1/withdrawal_requests/${request.id}/send_deposit`);
                                                                                callbacks.updateRequestStatus(response.data.status);
                                                                                adminNotice.setNoticeText('The deposit has been processed successfully.');
                                                                                adminNotice.setNoticeState('success');
                                                                                adminNotice.setNoticeTimestamp(Date.now());
                                                                            } catch(error) {
                                                                                console.log(error.response)

                                                                                adminModal.setModalData({
                                                                                    header: 'Notice',
                                                                                    content: (
                                                                                        <div className="padding-top-bottom-20">
                                                                                            <p className="padding-left-right-20 padding-bottom-20">Please lock this task before performing the action.</p>
                                                                                            <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                                                                <Button
                                                                                                    text="Ok"
                                                                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                                                                    backgroundColor="status--approved"
                                                                                                    width="120px"
                                                                                                    clickCallback={() => { adminModal.hideModal()}}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ),
                                                                                    confirmationText: 'Ok'
                                                                                });
                                                                                adminModal.toggleModal();
                                                                            } finally {
                                                                                setPageLoading(false);
                                                                            }
                                                                        }
                                                                    }
                                                                />)
                                                            
                                                            default:
                                                                return null;

                                                        }
                                                    })()
                                                }
                                            </div>
                                        </div>
                                            :
                                        <div className="box--details">
                                            <Button 
                                                text="Lock Task" 
                                                color="#fff"
                                                waveColor="rgba(0, 0, 0, 0.2)"
                                                backgroundColor="accent--three"
                                                width="120px"
                                                clickCallback={
                                                    async () => {
                                                        try {
                                                            setPageLoading(true);
                                                            const result = await axios.get(`/v1/withdrawal_requests/${request.id}/lock`);
                                                            setPageLoading(false);
                                                            adminNotice.setNoticeText('The task has been locked successfully');
                                                            adminNotice.setNoticeState('success');
                                                            const {id, first_name, last_name} = result.data.handler;
                                                            callbacks.lockTask({
                                                                ...result.data,
                                                                handler: {
                                                                    id: id,
                                                                    firstName: first_name,
                                                                    lastName: last_name
                                                                }
                                                            });
                                                            
                                                        } catch(error) {
                                                            adminNotice.setNoticeText(error.response.data.error);
                                                            adminNotice.setNoticeState('error');
                                                        } finally {
                                                            adminNotice.setNoticeTimestamp(Date.now());
                                                        }
                                                    }
                                            } />
                                        </div>
                                }
                            </div>
                        
                            <div className="box padding-bottom-10">
                                <h3 className="box--heading" style={{
                                    backgroundColor: 'var(--primary)',
                                    borderTopLeftRadius: '4px',
                                    borderTopRightRadius: '4px',
                                }}>
                                    <span style={{color: '#fff'}}>Administrator Actions</span>
                                </h3>
                                <div className="box--details">
                                    <Button
                                        text="Mark as Success"
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        backgroundColor="status--success"
                                        width="130px"
                                        margin="margin-right-10"
                                        clickCallback={
                                            async () => {
                                                try {
                                                    await axios.get(`/v1/purchase_requests/${request.id}/complete`);
                                                    adminNotice.setNoticeText('The task has been marked as a success.');
                                                    adminNotice.setNoticeState('success');
                                                    adminNotice.setNoticeTimestamp(Date.now());
                                                    history.goBack();
                                                } catch(error) {
                                                    console.log(error.response)
                                                    adminModal.setModalData({
                                                        header: 'Notice',
                                                        content: (
                                                            <div className="padding-top-bottom-20">
                                                                <p className="padding-left-right-20 padding-bottom-20">Please lock this task before marking it as a success.</p>
                                                                <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                                    <Button
                                                                        text="Ok"
                                                                        waveColor="rgba(0, 0, 0, 0.2)"
                                                                        backgroundColor="status--approved"
                                                                        width="120px"
                                                                        clickCallback={() => { adminModal.hideModal()}}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                        confirmationText: 'Ok'
                                                    });
                                                    adminModal.toggleModal();
                                                }
                                            }
                                        }
                                    />

                                    <Button
                                        text="Mark as Failure"
                                        waveColor="rgba(0, 0, 0, 0.2)"
                                        backgroundColor="dark--red"
                                        width="130px"
                                        clickCallback={
                                            async () => {
                                                try {
                                                    await axios.get(`/v1/purchase_requests/${request.id}/fail`);
                                                    adminNotice.setNoticeText('The task has been marked as a failure.');
                                                    adminNotice.setNoticeState('success');
                                                    adminNotice.setNoticeTimestamp(Date.now());
                                                    history.goBack();
                                                } catch(error) {
                                                    adminModal.setModalData({
                                                        header: 'Notice',
                                                        content: (
                                                            <div className="padding-top-bottom-20">
                                                                <p className="padding-left-right-20 padding-bottom-20">Please lock this task before marking it as a failure.</p>
                                                                <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                                    <Button
                                                                        text="Ok"
                                                                        waveColor="rgba(0, 0, 0, 0.2)"
                                                                        backgroundColor="status--approved"
                                                                        width="120px"
                                                                        clickCallback={() => { adminModal.hideModal()}}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                        confirmationText: 'Ok'
                                                    });
                                                    adminModal.toggleModal();
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <AdminTasksAvailableViewWithdrawalTimeline request={request} />
            }
        </div>
            :
        <Loading margin="margin-top-10" />
    )
}

export default AdminTasksAvailableViewWithdrawal;