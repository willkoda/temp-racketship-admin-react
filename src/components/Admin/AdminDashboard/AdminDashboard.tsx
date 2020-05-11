import React from 'react';
import './AdminDashboard.scss';
import Container from '../../../elements/Container/Container';

import { 
    People as PeopleIcon,
    LocationCity as LocationCityIcon,
    Assignment as AssignmentIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,

    NewReleases as NewReleasesIcon,
    SettingsEthernet as SettingsEthernetIcon,
    Update as UpdateIcon,
    ListAlt as ListAltIcon
} from '@material-ui/icons';

function AdminDashboard() {
    return (
        <Container paddingOnly={true}>
            <div className="AdminDashboard">
                <h1 className="text-align-left">Dashboard</h1>
                <div className="box--container">
                    <div className="box">
                        <div className="box--main--icon">
                            <PeopleIcon />
                        </div>
                        <div className="box--label">
                            Users
                        </div>
                        <div className="box--data">
                            10
                        </div>
                        <div className="box--border"></div>
                        <div className="box--details">
                            <span><NewReleasesIcon /></span>
                            <span>4 new users</span>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box--main--icon">
                            <LocationCityIcon />
                        </div>
                        <div className="box--label">
                            Clubs
                        </div>
                        <div className="box--data">
                            1
                        </div>
                        <div className="box--border"></div>
                        <div className="box--details">
                            <span><SettingsEthernetIcon /></span>
                            <span>1 club active</span>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box--main--icon">
                            <AssignmentIcon />
                        </div>
                        <div className="box--label">
                            Available Tasks
                        </div>
                        <div className="box--data">
                            6
                        </div>
                        <div className="box--border"></div>
                        <div className="box--details">
                            <span><UpdateIcon /></span>
                            <span>just updated</span>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box--main--icon">
                            <AssignmentTurnedInIcon />
                        </div>
                        <div className="box--label">
                            Closed Tasks
                        </div>
                        <div className="box--data">
                            15
                        </div>
                        <div className="box--border"></div>
                        <div className="box--details">
                            <span><ListAltIcon /></span>
                            <span>Last 24 hours</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminDashboard;