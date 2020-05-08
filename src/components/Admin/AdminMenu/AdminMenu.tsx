import React from 'react';
import './AdminMenu.scss';
import {NavLink} from 'react-router-dom';

import { 
    Assessment as AssessmentIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';

function AdminMenu() {
    return (
        <ul className="AdminMenu">
            <li>
                <NavLink exact to="/dashboard">
                    <DashboardIcon />
                    <div>Dashboard</div>
                </NavLink>
            </li>

            <li>
                <NavLink to="/dashboard/users">
                    <PeopleIcon />
                    <div>Users</div>
                </NavLink>
            </li>

            <li>
                <NavLink to="/dashboard/clubs">
                    <AssessmentIcon />
                    <div>Clubs</div>
                </NavLink>
            </li>

            <li>
                <NavLink to="/dashboard/settings">
                    <SettingsIcon />
                    <div>Settings</div>
                </NavLink>
            </li>
        </ul>
    )
}

export default AdminMenu;