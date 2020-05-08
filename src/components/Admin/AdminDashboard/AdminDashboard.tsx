import React from 'react';
import './AdminDashboard.scss';
import Container from '../../elements/Container/Container';

import { 
    Assessment as AssessmentIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    LocationCity as LocationCityIcon,
    Assignment as AssignmentIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon
} from '@material-ui/icons';

function AdminDashboard() {
    return (
        <Container paddingOnly={true}>
            <div className="AdminDashboard">
                <h1 className="text-align-left margin-bottom-40">Dashboard</h1>
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
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminDashboard;