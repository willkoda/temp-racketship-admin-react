import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LogIn from '../components/LogIn/LogIn';

function AdminTemplate() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={LogIn} />
            </Switch>
        </div>
    )
}

export default AdminTemplate;