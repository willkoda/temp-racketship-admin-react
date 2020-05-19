import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error from '../../../../components/Error/Error';

import AdminTasksAvailableList from './AdminTasksAvailableList/AdminTasksAvailableList';
import AdminTasksAvailableView from './AdminTasksAvailableView/AdminTasksAvailableView';

function AdminTasksAvailable() {
    return (
        <Switch>
            <Route exact path="/dashboard/tasks" component={AdminTasksAvailableList} />
            <Route exact path="/dashboard/tasks/available/" component={AdminTasksAvailableList} />
            <Route path ="/dashboard/tasks/available/view/:request_type/:id" component={AdminTasksAvailableView} />
            <Route path="*" render={() => <Error />} />
        </Switch>
    )
}

export default AdminTasksAvailable;