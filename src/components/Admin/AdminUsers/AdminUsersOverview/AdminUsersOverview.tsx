import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function AdminUsersOverview() {
    const location = useLocation(); 
    useEffect(() => {
        console.log('eff')
        // const id = location.pathname.split('/');
    }, [location.pathname])

    return (
        <div>admin users overview</div>
    )
}

export default AdminUsersOverview;