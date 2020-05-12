import React from 'react';
import {UserOverviewInterface, adminUsersOverviewRenderElements} from '../AdminUsersOverview';

interface Props {
    memberInformation: Partial<UserOverviewInterface>;
}

function AdminUsersOverviewStaff(props: Props) {
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
                </div>
            </div>
        </div>
    )
}

export default AdminUsersOverviewStaff;