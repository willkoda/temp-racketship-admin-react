import React, {useState, useEffect} from 'react';
import './AdminUsersOverview.scss';
import {useLocation} from 'react-router-dom';
import axios from '../../../../auxiliary/axios';
import Container from '../../../../elements/Container/Container';

import AdminUsersOverviewMember from './AdminUsersOverviewMember/AdminUsersOverviewMember';
import AdminUsersOverviewStaff from './AdminUsersOverviewStaff/AdminUsersOverviewStaff';

function AdminUsersOverview() {
    const location = useLocation();
    const [userInformation, setUserInformation] = useState({role: ''});

    useEffect(() => {
        (async function() {
            const id = location.pathname.split('/');
            const response = await axios.get(`/v1/users/${id[id.length - 1]}`);
            setUserInformation(response.data);
        })();
    }, [location.pathname])

    const renderTemplate = () => {
        switch(userInformation.role) {
            case 'member':
                return <AdminUsersOverviewMember memberInformation={userInformation} />
            case 'staff':
                return <AdminUsersOverviewStaff memberInformation={userInformation} />
            default:
                return <div>fathead</div>
        }
    };

    return (
        <Container paddingOnly={true}>
            <div className="AdminUsersOverview">
                {renderTemplate()}
            </div>
        </Container>
    )
}

export interface UserOverviewInterface {
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

export interface UserOverviewPropsInterface {
    memberInformation: Partial<UserOverviewInterface>;
}

export const adminUsersOverviewRenderElements = (params: {keys: Array<String>, propObject: Partial<UserOverviewInterface>}) => {
    return Object.entries(params.propObject).reduce((acc: Array<JSX.Element>, curr, index: number): Array<JSX.Element> => {
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

export default AdminUsersOverview;