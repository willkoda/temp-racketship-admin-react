import React from 'react';
import './AdminTasks.scss';
import {Switch, Route} from 'react-router-dom';
import AdminTasksAvailable from './AdminTasksAvailable/AdminTasksAvailable';
import AdminTasksClosed from './AdminTasksClosed/AdminTasksClosed';
import Error from '../../../components/Error/Error';

function AdminTasks() {
    return (
        <div className="AdminTasks" style={{height: 'inherit'}}>
            <Switch>
                <Route exact path="/dashboard/tasks" component={AdminTasksAvailable}/>
                <Route path="/dashboard/tasks/available" component={AdminTasksAvailable}/>
                <Route path="/dashboard/tasks/closed" render={AdminTasksClosed} />
                <Route path="*" render={() => <Error />} />
            </Switch>
        </div>
    )
}

export interface Activity {
    id: number;
    key: string;
    owner: {
        id: number;
        first_name: string;
        last_name: string;
        role: string;
    }
    timestamp: string;
}

export interface RequestData {
    id: number;
    amount: number;
    chips?: number;
    referenceNumber: string;
    bankAccount: {
        id: number;
        accountName: string;
        accountNumber: string;
        bankName: string;
    };
    handler?: {
        id: number;
        firstName: string;
        lastName: string;
    };
    linkedAccount?: {
        gameId: string;
        userName: string;
    }
    imageUrl: string;
    notes: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
        transactionHistory: {
            failed: {
                count: number;
                total: number;
            }
            success: {
                count: number;
                total: number;
            }
            unconfirmed: {
                count: number;
                total: number;
            }
        }
    };
    organization: {
        id: number;
        identifier: string;
        name: string;
    };
    status?: string;
}

export interface Task {
    id: number;
    type: string;
    request: {
        id: number;
        created_at: string;
        status: string;
        notes: string;
        handler: {
                id: number;
                first_name: string;
                last_name: string;
        } | undefined;
        linked_account: {
            id: number;
            game_id: string;
            username: string;
        }
        organization: {
            name: string;
        };
        user: {
            first_name: string;
            last_name: string;
        }
    }
}

export interface Pagination {
    pages: number;
    count: number;
    current: number;
}

export default AdminTasks;