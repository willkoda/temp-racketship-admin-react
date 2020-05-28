import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error from '../../../../components/Error/Error';

import AdminTasksClosedList from './AdminTasksClosedList/AdminTasksClosedList';
import AdminTasksClosedView from './AdminTasksClosedView/AdminTasksClosedView';
function AdminTasksAvailable() {
    return (
        <Switch>
            <Route exact path="/dashboard/tasks/closed" component={AdminTasksClosedList} />
            <Route exact path="/dashboard/tasks/closed/:page" component={AdminTasksClosedList} />
            <Route path="/dashboard/tasks/closed/view/:requestType/:id" component={AdminTasksClosedView} />
            <Route path="*" render={() => <Error />} />
        </Switch>
    )
}

export default AdminTasksAvailable;