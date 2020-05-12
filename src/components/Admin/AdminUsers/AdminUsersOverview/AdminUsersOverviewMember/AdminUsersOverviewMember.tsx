import React from 'react';
import Button from '../../../../../elements/Button/Button';

interface UserOverview {
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
    organization: {
        identifier: string;
        name: string;
    }
}

interface Props {
    memberInformation: Partial<UserOverview>;
}

function AdminUsersOverviewMember(props: Props) {

    const renderElements = (params: {keys: Array<String>, propObject: Partial<UserOverview>}) => {
        return Object.entries(props.memberInformation).reduce((acc: Array<JSX.Element>, curr, index: number): Array<JSX.Element> => {
            const key = curr[0].split('_').join(' ');
            if (params.keys.includes(curr[0])) {
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
                        {renderElements({
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
                        {renderElements({
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