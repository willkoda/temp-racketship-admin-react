import React from 'react';
import Button from '../../../../../elements/Button/Button';
import {
    UserOverviewPropsInterface,
    adminUsersOverviewRenderElements
} from '../AdminUsersOverview';

function AdminUsersOverviewMember(props: UserOverviewPropsInterface) {

    const blockUser = () => {
        console.log('block him')
    }

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
            </div>
        </div>
    )
}

export default AdminUsersOverviewMember;