import React from 'react';
import './AdminUsers.scss';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import AdminUsersList from './AdminUsersList/AdminUsersList';

interface Props {
    retrieveUsers(url: string): void;
}

function AdminUsers (props: Props) {
    const {path} = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/`} render={() => <AdminUsersList retrieveUsers={props.retrieveUsers} />} />
        </Switch>
    )
}

export default AdminUsers;
