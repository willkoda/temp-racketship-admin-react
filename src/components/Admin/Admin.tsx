import React from 'react';
import './Admin.scss';
import Header from '../../components/Header/Header';
import AdminMenu from '../Admin/AdminMenu/AdminMenu';
function Admin() {
    return (
        <React.Fragment>
            <Header headerType="admin" />
            <div className="Admin padding-top-80">
                <AdminMenu />
            </div>
        </React.Fragment>
    )
}

export default Admin;