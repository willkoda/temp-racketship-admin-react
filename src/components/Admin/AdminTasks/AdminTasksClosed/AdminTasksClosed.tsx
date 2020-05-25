import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error from '../../../../components/Error/Error';

import AdminTasksClosedList from './AdminTasksClosedList/AdminTasksClosedList';

// import AdminTasksAvailableView from './AdminTasksAvailableView/AdminTasksAvailableView';
// import AdminTasksAvailableSendChips from './AdminTasksAvailableSendChips/AdminTasksAvailableSendChips';

function AdminTasksAvailable() {
    return (
        <Switch>
            <Route exact path="/dashboard/tasks/closed" component={AdminTasksClosedList} />
            <Route exact path="/dashboard/tasks/closed/:page" component={AdminTasksClosedList} />
            {/*  />
            <Route path ="/dashboard/tasks/available/view/:request_type/:id" component={AdminTasksAvailableView} />
            <Route path ="/dashboard/tasks/available/send-chips/:id" component={AdminTasksAvailableSendChips} /> */}
            <Route path="*" render={() => <Error />} />
        </Switch>
    )
}

export default AdminTasksAvailable;