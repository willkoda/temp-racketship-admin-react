import React, {useEffect, useState} from 'react';
import axios from '../../../../../auxiliary/axios';
import Container from '../../../../../elements/Container/Container';
import {useParams, useHistory} from 'react-router-dom';
import {RequestData} from '../../AdminTasksAvailable/AdminTasksAvailableView/AdminTasksAvailableView';
import {formatName} from '../../../../../auxiliary/functions/format-name';
import Button from '../../../../../elements/Button/Button';

function AdminTasksAvailableSendChips() {
    const {id} = useParams();
    const history = useHistory();
    const [purchaseRequest, setPurchaseRequest] = useState<Partial<RequestData>>(null!)

    useEffect(() => {
        if (!id) {
            history.replace('/error');
        }
        const init = async () => {
            try {
                const response = await axios.get(`/v1/purchase_requests/${id}`);
                const {amount, reference_number, user, organization, linked_account} = response.data;
                setPurchaseRequest({
                    id: response.data.id,
                    amount: amount,
                    referenceNumber: reference_number,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        mobileNumber: user.mobile_number,
                        transactionHistory: user.transaction_history
                    },
                    linkedAccount: {
                        gameId: linked_account.game_id,
                        userName: linked_account.username
                    },
                    organization: {
                        id: organization.id,
                        identifier: organization.identifier,
                        name: organization.name
                    }
                })
            } catch(error) {
                console.log(error.response)
                history.replace('/error');
            }
        }
        init();
    }, [id, history])

    return (
        <Container paddingOnly={true}>
            <div className="AdminTasksAvailableSendChips">
                <h2 className="overview--heading">Send Chips</h2>
                <div className="overview--boxes">
                    <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                        <h3 className="box--heading">
                            Send chips to {purchaseRequest ? formatName(purchaseRequest.user?.firstName!, purchaseRequest.user?.lastName!) : ''}
                        </h3>
                        <div className="box--details">
                            <div className="box--row">
                                <div className="key">Reference Number:</div>
                                <div className="value">{purchaseRequest?.referenceNumber}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Sender's Name:</div>
                                <div className="value">
                                    {purchaseRequest ? formatName(purchaseRequest.user?.firstName!, purchaseRequest.user?.lastName!) : ''}
                                </div>
                            </div>
                            <div className="box--row">
                                <div className="key">Email:</div>
                                <div className="value">{purchaseRequest?.user?.email}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Sender's Number</div>
                                <div className="value">{purchaseRequest?.user?.mobileNumber}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Chips:</div>
                                <div className="value">{purchaseRequest?.amount}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club Name:</div>
                                <div className="value">{purchaseRequest?.organization?.name}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">Club ID:</div>
                                <div className="value">{purchaseRequest?.organization?.identifier}</div>
                            </div>
                            <div className="box--row">
                                <div className="key">In-Game Account:</div>
                                <div className="value">
                                    {purchaseRequest?.linkedAccount?.userName} ({purchaseRequest?.linkedAccount?.gameId}) 
                                </div>
                            </div>
                            <p className="margin-top-30">Total Chips to Send: {purchaseRequest?.amount}</p>
                            <Button
                                backgroundColor="accent--three"
                                waveColor="rgba(0, 0, 0, 0.2)"
                                text="Complete Task"
                                width="120px"
                                margin="margin-top-20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminTasksAvailableSendChips;