import React, {useCallback, useEffect, useRef} from 'react';
import './Admin.scss';
import {Switch, Route} from 'react-router-dom';
import Header from '../../components/Header/Header';
import AdminMenu from '../Admin/AdminMenu/AdminMenu';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import Modal from '../../elements/Modal/Modal';
import Notice from '../../elements/Notice/Notice';
import Error from '../../components/Error/Error';
import AdminTasks from '../../components/Admin/AdminTasks/AdminTasks';

import SideMenuProvider from '../../providers/SideMenuProvider';
import axios from '../../auxiliary/axios';

import {users} from '../../auxiliary/state';
import {storeSetUsers} from '../../auxiliary/dispatch';
import {compose} from 'redux';

import withStoreConnection from '../../hoc/withStoreConnection';
import withTokenValidation from '../../hoc/withTokenValidation';

import {UsersStateInterface} from '../../redux/reducers/users-reducer';

import AdminModalProvider, {AdminModalContext} from './AdminModalProvider';
import AdminNoticeProvider, {AdminNoticeContext} from './AdminNoticeProvider';

interface Props {
    storeSetUsers(params: Partial<UsersStateInterface>): void;
    users: UsersStateInterface;
    validateToken(): void;
}

function Admin(props: Props) {
    const adminContentRef = useRef<HTMLDivElement>(null!);
    const {storeSetUsers, validateToken} = props;
    const retrieveUsers = useCallback(async (url) => {
        try {
            storeSetUsers({
                progressIndicatorVisible: true
            })
            const response = await axios.get(url);
            const users = response.data.users.map((el: any) => {
                return Object.entries(el).map(e => ({key: e[0], value: e[1]})).reduce((acc: any, curr: any) => {
                    const key = curr.key.split('_')
                        .map((word: string, index: number) => index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
                        .join('');
                    acc[key] = curr.value
                    return acc;
                }, {})
            })
            const pagination = {
                nextUrl: response.data.pagination.next_url,
                previousUrl: response.data.pagination.previous_url,
                currentPage: response.data.pagination.current,
                pages: response.data.pagination.pages,
                totalCount: response.data.pagination.count
            }
            storeSetUsers({
                users: users,
                pagination: pagination
            })
            setTimeout(() => {
                storeSetUsers({
                    progressIndicatorVisible: false
                })
            }, 500)
        } catch(error) {
            console.log(error)
        }
    }, [storeSetUsers]);

    useEffect(() => {
        validateToken();
    }, [validateToken])

    useEffect(() => {
        retrieveUsers('/v1/users');
    }, [retrieveUsers]);

    useEffect(() => {
        if (window.innerWidth > 768) {
            const height = window.innerHeight - 80 - 20;
            adminContentRef.current.style.height = height + 'px';
        }
    }, []);

    return (
        <SideMenuProvider>
            <AdminModalProvider>
                <AdminNoticeProvider>
                    <Modal 
                        context={AdminModalContext}
                    />
                    <Header headerType="admin" />
                    <div className="Admin padding-top-80">
                    <AdminMenu />
                    <div className="admin--content" ref={adminContentRef}>
                        <AdminNoticeContext.Consumer>
                            {(noticeContext) => {
                                return <Notice
                                    padding="padding-top-20 padding-left-20 padding-right-20"
                                    text={noticeContext.noticeText}
                                    noticeState={noticeContext.noticeState}
                                    timeStamp={noticeContext.noticeTimeStamp}
                                />
                            }}
                        </AdminNoticeContext.Consumer>
                        <Switch>
                            <Route exact path="/dashboard" component={AdminDashboard}/>
                            <Route path="/dashboard/users" render={() => <AdminUsers retrieveUsers={retrieveUsers} />} />
                            <Route path="/dashboard/tasks/" component={AdminTasks} />
                            <Route path="/error" render={() => <Error />} />
                            <Route path="*" render={() => <Error />} />
                        </Switch>
                    </div>
                    </div>
                </AdminNoticeProvider>
            </AdminModalProvider>
        </SideMenuProvider>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]}),
    withTokenValidation
)(Admin)