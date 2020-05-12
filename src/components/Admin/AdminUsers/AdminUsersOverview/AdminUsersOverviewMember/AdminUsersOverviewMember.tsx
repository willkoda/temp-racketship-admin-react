import React, {useEffect, useState} from 'react';
import Button from '../../../../../elements/Button/Button';
import Table from '../../../../../elements/Table/Table';
import axios from '../../../../../auxiliary/axios';
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
    }>
}

function AdminUsersOverviewMember(props: UserOverviewPropsInterface) {

    const blockUser = () => {
        console.log('block him')
    }

    const {id, organization} = props.memberInformation;
    const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequests>({
        pagination: {pages: 1, count:  0, current: 1}, requests: []
    })

    useEffect(() => {
        (async function() {
            const response = await axios.get(`/v1/organizations/${organization?.id}/members/${id}/purchase_requests?page=${1}`);
            const {pagination, purchase_requests} = response.data;
            setPurchaseRequests({pagination: pagination, requests: purchase_requests})
        })();
    }, [])

    useEffect(() => {
        console.log(purchaseRequests)
    }, [purchaseRequests])

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
                                el.created_at
                            ])
                        }
                        nextPageClickHandler={() => console.log('fat next')}
                        previousPageClickHandler={() => console.log('fat previous')}
                        pagination={{
                            pages: purchaseRequests.pagination.pages,
                            currentPage: purchaseRequests.pagination.current,
                            totalCount: purchaseRequests.pagination.count
                        }}
                    />
                 </section>
                 <div style={{height: '300px', width: '100%'}}></div>
            </div>
        </div>
    )
}

export default AdminUsersOverviewMember;