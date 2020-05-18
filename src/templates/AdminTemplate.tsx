import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LogIn from '../components/LogIn/LogIn';
import Admin from '../components/Admin/Admin';
import Error from '../components/Error/Error';
function AdminTemplate() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={LogIn} />
                <Route path="/login" component={LogIn} />
                <Route path="/dashboard" component={Admin} />
                <Route path="*" render={() => <Error />} />
            </Switch>
        </div>
    )
}

export default AdminTemplate;