import React, {useEffect, useState} from 'react';
import Button from '../../../../../elements/Button/Button';
import Table from '../../../../../elements/Table/Table';
import axios from '../../../../../auxiliary/axios';
import chips from '../../../../../assets/images/chip.svg';
import {
    UserOverviewPropsInterface,
    adminUsersOverviewRenderElements
} from '../AdminUsersOverview';

import {
    AttachMoney as AttachMoneyIcon
} from '@material-ui/icons';

interface PurchaseRequests {
    pagination: {
        pages: number;
        count: number;
        current: number;
    };
    requests: Array<{
        created_at: string;
        id: number;
        reference_number: string;
        status: string;
        amount:  number;
        linked_account: {
            game_id: number;
            username: string;
        };
        bank_account: {
            account_name: string;
            account_number: number;
        }
    }>;
    progressIndicatorVisible?: boolean
}

interface WithdrawalRequests extends PurchaseRequests {
    requests: Array<{
        created_at: string;
        id: number;
        reference_number: string;
        status: string;
        amount:  number;
        chips: number;
        linked_account: {
            game_id: number;
            username: string;
        };
        bank_account: {
            account_name: string;
            account_number: number;
        }
    }>
}

function AdminUsersOverviewMember(props: UserOverviewPropsInterface) {
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, requests: [], progressIndicatorVisible: false};
    const blockUser = () => {
        console.log('block him')
    }

    const {id, organization} = props.memberInformation;
    const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequests>({...initialData});
    const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequests>({...initialData});

    useEffect(() => {
        (async function() {
            const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${1}`);
            const {pagination, purchase_requests} = response.data;
            setPurchaseRequests({pagination: pagination, requests: purchase_requests});
        })();

        (async function() {
            const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/withdrawal_requests?page=${1}`);
            const {pagination, withdrawal_requests} = response.data;
            setWithdrawalRequests({pagination: pagination, requests: withdrawal_requests});
        })();
    }, [id, organization])

    return (
        <div className="AdminUsersOverviewMember">
            <h2 className="overview--heading">Member Overview</h2>
            <div className="overview--boxes">
                <div className="box padding-bottom-10">
                    <h3 className="box--heading">Account Details</h3>
                    <div className="box--details">
                        {adminUsersOverviewRenderElements({
                            keys: ['id', 'name', 'email', 'mobile_number', 'verified', 'verified_on', 'blocked', 'blocked_on'],
                            propObject: props.memberInformation
                        })}
                    </div>
                    <div className="detail--buttons">
                        <Button 
                            padding='6px 8px'
                            text="Block" 
                            waveColor="rgba(0, 0, 0, 0.2)" 
                            backgroundColor="dark--red" 
                            color="#fff" clickCallback={blockUser}
                            width="80px" />
                    </div>
                </div>

                <div className="box">
                    <h3 className="box--heading">Club</h3>
                    <div className="box--details">
                        <div className="box--row">
                            <div className="key">organization:</div>
                            <div className="value">{props.memberInformation.organization?.name}</div>
                        </div>
                        {adminUsersOverviewRenderElements({
                            keys: ['referral_code', 'total_cash_outs', 'total_purchases'],
                            propObject: props.memberInformation
                        })}
                    </div>
                </div>
                <section className="purchase--requests margin-top-20" style={{width: '100%'}}>
                    <Table 
                        tableName={<div className="table--name">
                            <span style={{
                                backgroundColor: 'var(--status--requested--background)',
                                color: 'var(--status--requested--color)',
                                }}>
                                Deposits
                            </span>
                        </div>}
                        headers={['Reference Number', 'Amount', 'Game Account', 'Bank Account', 'Requested', 'Status']}
                        content={
                            purchaseRequests.requests.map(el => [
                                el.reference_number,
                                <div className="key--value--pair">
                                    <span style={{color: 'var(--status--success--color)'}}><AttachMoneyIcon /></span>
                                    <span>{el.amount}</span>
                                </div>,
                                `${el.linked_account.username}(${el.linked_account.game_id})`,
                                `${el.bank_account.account_name}(${el.bank_account.account_number})`,
                                el.created_at,
                                <div className={`status ${el.status}`}>
                                    <span className="value">{el.status}</span>
                                </div>
                            ])
                        }
                        nextPageClickHandler={
                            async () => {
                                setPurchaseRequests({...purchaseRequests, progressIndicatorVisible: true})
                                const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${purchaseRequests.pagination.current + 1}`);
                                const {pagination, purchase_requests} = response.data;
                                setPurchaseRequests({pagination: pagination, requests: purchase_requests, progressIndicatorVisible: false})
                            }
                        }
                        previousPageClickHandler={
                            async () => {
                                setPurchaseRequests({...purchaseRequests, progressIndicatorVisible: true})
                                const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${purchaseRequests.pagination.current - 1}`);
                                const {pagination, purchase_requests} = response.data;
                                setPurchaseRequests({pagination: pagination, requests: purchase_requests, progressIndicatorVisible: false});
                            }
                        }
                        progressIndicatorVisible={purchaseRequests.progressIndicatorVisible}
                        pagination={{
                            pages: purchaseRequests.pagination.pages,
                            currentPage: purchaseRequests.pagination.current,
                            totalCount: purchaseRequests.pagination.count
                        }}
                    />
                 </section>

                 <section className="withdrawal--requests margin-top-20" style={{width: '100%'}}>
                    <Table
                        tableName={<div className="table--name">
                        <span style={{
                            backgroundColor: 'var(--status--pending--background)',
                            color: 'var(--status--pending--color)',
                            }}>
                            Cashouts
                        </span>
                        </div>}
                        headers={['Reference Number', 'Amount', 'Game Account', 'Requested', 'Status']}
                        content={
                            withdrawalRequests.requests.map(el => [
                                el.reference_number,
                                <div className="key--value--pair">
                                    <span style={{color: 'var(--status--success--color)'}}><img src={chips} style={{width: '25px'}} className="margin-right-10" alt="chip icon" /></span>
                                    <span>{el.chips}</span>
                                </div>,
                                `${el.linked_account.username}(${el.linked_account.game_id})`,
                                el.created_at,
                                <div className={`status ${el.status}`}>
                                    <span className="value">{el.status}</span>
                                </div>
                            ])
                        }
                        nextPageClickHandler={
                            async () => {
                                setWithdrawalRequests({...withdrawalRequests, progressIndicatorVisible: true})
                                const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/withdrawal_requests?page=${withdrawalRequests.pagination.current + 1}`);
                                const {pagination, withdrawal_requests} = response.data;
                                setWithdrawalRequests({pagination: pagination, requests: withdrawal_requests, progressIndicatorVisible: false})
                            }
                        }
                        previousPageClickHandler={
                            async () => {
                                setWithdrawalRequests({...withdrawalRequests, progressIndicatorVisible: true})
                                const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/withdrawal_requests?page=${withdrawalRequests.pagination.current - 1}`);
                                const {pagination, withdrawal_requests} = response.data;
                                setWithdrawalRequests({pagination: pagination, requests: withdrawal_requests, progressIndicatorVisible: false})
                            }
                        }
                        pagination={{
                            pages: withdrawalRequests.pagination.pages,
                            currentPage: withdrawalRequests.pagination.current,
                            totalCount: withdrawalRequests.pagination.count
                        }}
                    />
                 </section>
            </div>
        </div>
    )
}

export default AdminUsersOverviewMember;