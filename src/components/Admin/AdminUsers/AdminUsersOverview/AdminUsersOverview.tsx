import React, {useState, useEffect} from 'react';
import './AdminUsersOverview.scss';
import {useLocation} from 'react-router-dom';
import axios from '../../../../auxiliary/axios';
import Container from '../../../../elements/Container/Container';

import AdminUsersOverviewMember from './AdminUsersOverviewMember/AdminUsersOverviewMember';

function AdminUsersOverview() {
    const location = useLocation();
    const [userInformation, setUserInformation] = useState({role: ''});

    useEffect(() => {
        (async function() {
            const id = location.pathname.split('/');
            const response = await axios.get(`/v1/users/${id[id.length - 1]}`);
            console.log(response.data)
            setUserInformation(response.data);
        })();
    }, [location.pathname])

    const renderTemplate = () => {
        switch(userInformation.role) {
            case 'member':
                return <AdminUsersOverviewMember memberInformation={userInformation} />
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

export default AdminUsersOverview;