import React, {useContext, useEffect, useState} from 'react';
import './AdminTasksAvailableViewPurchase.scss';
import {RequestData} from '../AdminTasksAvailableView';
import {formatName} from '../../../../../../auxiliary/functions/format-name';
import Button from '../../../../../../elements/Button/Button';
import axios from '../../../../../../auxiliary/axios';
import {AdminNoticeContext} from '../../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../../AdminModalProvider';
import IconButton from '../../../../../../elements/IconButton/IconButton';
import noteImage from '../../../../../../assets/images/note.svg';
import noteTwoImage from '../../../../../../assets/images/note-two.svg';
import AdminTasksAvailableViewPurchaseNote from './AdminTasksAvailableViewPurchaseNote/AdminTasksAvailableViewPurchaseNote';
import AdminTasksAvailableViewPurchasePlayerNote from './AdminTasksAvailableViewPurchasePlayerNote/AdminTasksAvailableViewPurchasePlayerNote';
import Select from '../../../../../../elements/Select/Select';
import Input from '../../../../../../elements/Input/Input';
import {
    Person as PersonIcon,
    CalendarToday as CalendarTodayIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';
import {formatDate} from '../../../../../../auxiliary/functions/format-date';

interface InitialState {
    value: string;
    valid: boolean;
    error: string;
}

interface BankAccount {
    id: number;
    account_name: string;
    account_number: string;
    bank_name: string;
    country: string;
}

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
    const [playerNotes, setPlayerNotes] = useState<Array<Note>>(null!);

    const [clubBankAccountOptions, setClubBankAccountOptions] = useState<Array<{text: string, value: string}>>(null!);
    const initialState: InitialState = {value: '', valid: false, error: ''};
    const [selectedBankAccount, setSelectedBankAccount] = useState({...initialState});
    const [requestAmount,  setRequestAmount] = useState({...initialState});

    useEffect(() => {
        (async function() {
            if (request) {
                const response = await axios.get(`/v1/organizations/${request.organization.id}/members/${request.user.id}/player_notes?page=${1}`);
                const {notes} = response.data;
                setPlayerNotes(notes)
            }
        })()
    }, [request])

    useEffect(() => {
        (async function() {
            if (request) {
                const response = await axios.get(`/v1/organizations/${request.organization.id}/bank_accounts?page=${1}`);
                setClubBankAccountOptions(response.data.accounts.map((account: BankAccount) => {
                    return {
                        text: `${account.bank_name} (${account.account_number})`,
                        value: account.id.toString()
                    }
                }))
                setSelectedBankAccount({
                    value: request.bankAccount.id.toString(),
                    valid: true,
                    error: ''
                })
                setRequestAmount({
                    value: request.amount.toString(),
                    valid: true,
                    error: ''
                })
            }
        })()
    }, [request])

    

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

                    <div className="box player--notes">
                        <h3 className="box--heading">
                            <span>Player Notes</span>
                            <div className="button--container" style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}>
                                <IconButton
                                    showToolTip={true}
                                    toolTip="Add Player Note"
                                    iconElement={<img src={noteTwoImage} style={{height: '25px'}} alt=""/>}
                                    waveColor="rgba(0, 0, 0, 0.2)"
                                    clickHandler={
                                        () => {
                                            adminModal.setModalData({
                                                header: 'Add a Player Note',
                                                content: <AdminTasksAvailableViewPurchasePlayerNote 
                                                    callback={
                                                        (note) => {
                                                            setPlayerNotes([
                                                                ...playerNotes,
                                                                note
                                                            ])
                                                            adminModal.hideModal();
                                                            adminNotice.setNoticeText('Successfully added player note');
                                                            adminNotice.setNoticeState('success');
                                                            adminNotice.setNoticeTimestamp(Date.now());
                                                        }
                                                    } 
                                                    request={request} 
                                                    noteRequestType="add" />,
                                                confirmationText: 'Submit'
                                            })
                                            adminModal.toggleModal();
                                        }
                                    }
                                />
                            </div>
                        </h3>
                        <div className="box--details">
                            {
                                playerNotes?.map((el, index) => (
                                    <div key={index}>
                                        <p className="text-align-left">{el.notes}</p>
                                        <div className="player--note">
                                            <div className="pair">
                                                <PersonIcon/>
                                                <span>{formatName(el.staff.first_name, el.staff.last_name)}</span>
                                            </div>
                                            <div className="pair">
                                                <CalendarTodayIcon />
                                                <span>{formatDate(el.created_at)}</span>
                                            </div>
                                            <div className="pair">
                                                <IconButton
                                                    color="var(--status--success--color)"
                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                    iconElement={<EditIcon />}
                                                    clickHandler={() => {
                                                        const note = playerNotes[index];
                                                        adminModal.setModalData({
                                                            header: 'Edit Note',
                                                            content: <AdminTasksAvailableViewPurchasePlayerNote
                                                                callback={(note) => {
                                                                    const index = playerNotes.findIndex(el => el.id === note.id);
                                                                    const clone = [...playerNotes];
                                                                    clone.splice(index, 1, note);
                                                                    setPlayerNotes(clone);

                                                                    adminModal.hideModal();
                                                                    adminNotice.setNoticeText('Successfully edited player note');
                                                                    adminNotice.setNoticeState('success');
                                                                    adminNotice.setNoticeTimestamp(Date.now());
                                                                }}
                                                                note={note} 
                                                                request={request}
                                                                noteRequestType="edit" />,
                                                            confirmationText: 'Submit'
                                                        })
                                                        adminModal.toggleModal();
                                                    }}
                                                />

                                                <IconButton
                                                    color="var(--dark-red)"
                                                    waveColor="rgba(0, 0, 0, 0.2)"
                                                    iconElement={<DeleteIcon />}
                                                    clickHandler={async () => {
                                                        const clone = [...playerNotes];
                                                        clone.splice(index, 1);
                                                        setPlayerNotes(clone);
                                                        try {
                                                            await axios.delete(`/v1/organizations/${request.organization.id}/members/${request.user.id}/player_notes/${el.id}`);
                                                            adminNotice.setNoticeText('Successfully deleted player note');
                                                            adminNotice.setNoticeState('success');
                                                            adminNotice.setNoticeTimestamp(Date.now());
                                                        } catch(error) {
                                                            adminNotice.setNoticeText('There was an error deleting the note');
                                                            adminNotice.setNoticeState('error');
                                                            adminNotice.setNoticeTimestamp(Date.now());
                                                        }
                                                        
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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

            <section className="adjustment--and--admin--actions">
                <div className="overview--boxes">
                    <div className="box padding--bottom-10">
                        <h3 className="box--heading">
                            <span>Adjustment</span>
                            <span className="sub--heading">If the player has sent it to the wrong account or entered an incorrect amount, please adjust the values accordingly.</span>
                        </h3>
                        <div className="box--details">
                            <form>
                                <Select
                                    id="club-bank-account"
                                    error={selectedBankAccount.error}
                                    options={clubBankAccountOptions}
                                    select={(result) => console.log(result)}
                                    selectColor="var(--medium-grey)"
                                    selectText="Select a Bank Account"
                                    initialValue={
                                        (() =>  {
                                            const result = clubBankAccountOptions?.find(el => el.value === selectedBankAccount.value)
                                            return result ? result.text : '';
                                        })()
                                    }
                                />

                                <Input
                                    margin="margin-top-20" 
                                    changeCallback={() => console.log('change me')}
                                    error={requestAmount.error}
                                    id="request-amount"
                                    initialValue={requestAmount.value}
                                    // inputBackgroundColor?: string;
                                    // inputBorderColor?: string;
                                    // margin?: string;
                                    placeholder="Amount"
                                    // timeStamp?: number;
                                    // type?: string;
                                    // validatedProps?: {
                                    //     email?: boolean;
                                    //     minLength?: number;
                                    //     english?: boolean;
                                    // };
                                    valid={requestAmount.valid}
                                    value={requestAmount.value.toString()}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export interface Note {
    id: number;
    created_at: string;
    notes: string;
    staff: {
        id: number;
        first_name: string;
        last_name: string;
    }
}

export default AdminTasksAvailableViewPurchase;