import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error from '../../../../components/Error/Error';

import AdminTasksAvailableList from './AdminTasksAvailableList/AdminTasksAvailableList';
import AdminTasksAvailableView from './AdminTasksAvailableView/AdminTasksAvailableView';
import AdminTasksAvailableSendChips from './AdminTasksAvailableSendChips/AdminTasksAvailableSendChips';

function AdminTasksAvailable() {
    return (
        <Switch>
            <Route exact path="/dashboard/tasks" component={AdminTasksAvailableList} />
            <Route exact path="/dashboard/tasks/available/:page" component={AdminTasksAvailableList} />
            <Route path ="/dashboard/tasks/available/view/:requestType/:id" component={AdminTasksAvailableView} />
            <Route path ="/dashboard/tasks/available/send-chips/:id" component={AdminTasksAvailableSendChips} />
            <Route path="*" render={() => <Error />} />
        </Switch>
    )
}

export default AdminTasksAvailable;