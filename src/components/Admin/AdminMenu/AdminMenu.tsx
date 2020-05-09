import React, {useEffect, useRef, useContext} from 'react';
import './AdminMenu.scss';
import {NavLink} from 'react-router-dom';

import { 
    Assessment as AssessmentIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';

import {SideMenuContext} from '../../../providers/SideMenuProvider';

function AdminMenu() {
    const sideMenuRef = useRef<HTMLUListElement>(null!);
    const context = useContext(SideMenuContext);

    useEffect(() => {
        if (context.sideMenuVisible) {
            sideMenuRef.current.style.flex = '0 1 300px';
        } else {
            sideMenuRef.current.style.flex = '0 1 0px';
        }
    }, [context])

    return (
        <ul className="AdminMenu" ref={sideMenuRef}>
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