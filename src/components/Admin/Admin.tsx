import React from 'react';
import './Admin.scss';
import {Switch, Route} from 'react-router-dom';
import Header from '../../components/Header/Header';
import AdminMenu from '../Admin/AdminMenu/AdminMenu';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
function Admin() {
    return (
        <React.Fragment>
            <Header headerType="admin" />
            <div className="Admin padding-top-80">
                <AdminMenu />
                <div className="admin--content">
                    <Switch>
                        <Route exact path="/dashboard" component={AdminDashboard}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin;