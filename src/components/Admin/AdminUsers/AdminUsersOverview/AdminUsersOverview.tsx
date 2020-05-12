import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function AdminUsersOverview() {
    const location = useLocation(); 
    useEffect(() => {
        const id = location.pathname.split('/');
    }, [])

    return (
        <div>admin users overview</div>
    )
}

export default AdminUsersOverview;