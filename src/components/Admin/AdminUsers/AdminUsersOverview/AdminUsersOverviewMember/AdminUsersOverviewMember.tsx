import React from 'react';
import Button from '../../../../../elements/Button/Button';

interface Props {
    memberInformation: Partial<{
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        mobile_number: string;
        role: string;
        verified: boolean;
        verified_on: string;
        blocked: boolean;
        blocked_on: string;
    }>;
}

function AdminUsersOverviewMember(props: Props) {

    const renderAccountDetails = () => {
        const accountDetails = [
            'id', 'name', 'email', 'mobile_number', 'verified', 'verified_on', 'blocked', 'blocked_on'
        ];

        return Object.entries(props.memberInformation).reduce((acc: Array<JSX.Element>, curr, index: number): Array<JSX.Element> => {
            const key = curr[0].split('_').join(' ');
            if (accountDetails.includes(curr[0])) {
                acc.push(
                    <div className="box--row" key={index}>
                        <div className="key">{key}:</div>
                        <div className="value">{curr[1]?.toString()}</div>
                    </div>
                )
            }
            return acc;
        }, []);
    }

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
                        {renderAccountDetails()}
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
            </div> 
        </div>
    )
}

export default AdminUsersOverviewMember;