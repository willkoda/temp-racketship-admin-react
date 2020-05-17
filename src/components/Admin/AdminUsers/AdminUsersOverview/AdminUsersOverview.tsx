import React, {useState, useEffect, useRef} from 'react';
import './AdminUsersOverview.scss';
import {useLocation} from 'react-router-dom';
import axios from '../../../../auxiliary/axios';
import Container from '../../../../elements/Container/Container';

import { CircularProgress } from '@material-ui/core';

import AdminUsersOverviewMember from './AdminUsersOverviewMember/AdminUsersOverviewMember';
import AdminUsersOverviewStaff from './AdminUsersOverviewStaff/AdminUsersOverviewStaff';
import AdminUsersOverviewOwner from './AdminUsersOverviewOwner/AdminUsersOverviewOwner';
import AdminUsersOverviewAdmin from './AdminUsersOverviewAdmin/AdminUsersOverviewAdmin';

function AdminUsersOverview() {
    const location = useLocation();
    const [userInformation, setUserInformation] = useState({role: ''});
    const templateRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        (async function() {
            const id = location.pathname.split('/');
            const response = await axios.get(`/v1/users/${id[id.length - 1]}`);
            if (templateRef.current) setUserInformation(response.data);
        })();
    }, [location.pathname, templateRef])

    const renderTemplate = () => {
        switch(userInformation.role) {
            case 'member':
                return <AdminUsersOverviewMember userInformation={userInformation} />
            case 'staff':
                return <AdminUsersOverviewStaff userInformation={userInformation} />
            case 'owner':
                return <AdminUsersOverviewOwner userInformation={userInformation} />
            case 'admin':
                return <AdminUsersOverviewAdmin userInformation={userInformation} />
            default:
                return <CircularProgress />
        }
    };

    return (
        <Container paddingOnly={true}>
            <div className="AdminUsersOverview" ref={templateRef}>
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
        id: number;
        identifier: string;
        name: string;
    }
}

export interface UserOverviewPropsInterface {
    userInformation: Partial<UserOverviewInterface>;
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