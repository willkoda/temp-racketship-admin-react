import React, {useEffect, useRef, useContext} from 'react';
import './AdminMenu.scss';
import {NavLink} from 'react-router-dom';
import Accordion from '../../../elements/Accordion/Accordion';

import { 
    Assessment as AssessmentIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,

    FormatListBulleted as FormatListBulletedIcon,
    PlaylistAddCheck as PlaylistAddCheckIcon,
    SyncAlt as SyncAltIcon,
    NewReleases as NewReleasesIcon,
    FormatListNumbered as FormatListNumberedIcon
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

            <li className="accordion--menu">
                <Accordion
                    header={
                        <div className="padding-left-20" style={{display: 'flex', alignItems: 'center'}}>
                            <FormatListNumberedIcon className="margin-right-40" />
                            <span style={{fontSize: '14px'}}>Tasks</span>
                        </div>
                    }
                    content={
                        <ul className="dashboard--tasks">
                            <li>
                                <NavLink to="/dashboard/tasks">
                                    <FormatListBulletedIcon />
                                    <div>Avialable</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/tasks">
                                    <PlaylistAddCheckIcon />
                                    <div>Closed</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/tasks">
                                    <SyncAltIcon />
                                    <div>Withdrawals</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/tasks">
                                    <NewReleasesIcon />
                                    <div>New Verifications</div>
                                </NavLink>
                            </li>
                        </ul>
                    }
                    waveColor="rgba(255, 255, 255, 0.2)" 
                />
            </li>

            <li className="tasks--link">

            </li>
        </ul>
    )
}

export default AdminMenu;