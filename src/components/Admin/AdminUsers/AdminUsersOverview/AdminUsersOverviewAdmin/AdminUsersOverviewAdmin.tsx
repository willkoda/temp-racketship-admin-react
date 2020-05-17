import React from 'react';
import {
    adminUsersOverviewRenderElements,
    UserOverviewPropsInterface
} from '../AdminUsersOverview';

function AdminUsersOverviewAdmin(props: UserOverviewPropsInterface) {
    return (
        <div className="AdminUsersOverviewAdmin">
            <h2 className="overview--heading">Admin Overview</h2>
            <div className="overview--boxes">
                <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                    <h3 className="box--heading">Account Details</h3>
                    <div className="box--details">
                        {adminUsersOverviewRenderElements({
                            keys: ['id', 'name', 'email', 'mobile_number', 'verified', 'verified_on', 'blocked', 'blocked_on'],
                            propObject: props.userInformation
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUsersOverviewAdmin;