import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error from '../../../../components/Error/Error';

import AdminTasksAvailableList from './AdminTasksAvailableList/AdminTasksAvailableList';

function AdminTasksAvailable() {
    return (
        <Switch>
            <Route exact path="/dashboard/tasks" component={AdminTasksAvailableList} />
            <Route path="*" render={() => <Error />} />
        </Switch>
    )
}

export default AdminTasksAvailable;