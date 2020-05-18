import React from 'react';
import './AdminTasks.scss';
import {Switch, Route} from 'react-router-dom';
import AdminTasksAvailable from './AdminTasksAvailable/AdminTasksAvailable';
import Error from '../../../components/Error/Error';

function AdminTasks() {
    return (
        <div className="AdminTasks" style={{height: 'inherit'}}>
            <Switch>
                <Route exact path="/dashboard/tasks/" component={AdminTasksAvailable}/>
                <Route path="/dashboard/tasks/closed" render={() => <div>closed</div>} />
                <Route path="*" render={() => <Error />} />
            </Switch>
        </div>
    )
}

export default AdminTasks;