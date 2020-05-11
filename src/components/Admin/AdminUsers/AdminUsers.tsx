import React from 'react';
import './AdminUsers.scss';
import Container from '../../../elements/Container/Container';
import Table from '../../../elements/Table/Table';

import {compose} from 'redux';
import withStoreConnection from '../../../hoc/withStoreConnection';
import {users} from '../../../auxiliary/state';

import {UsersStateInterface} from '../../../redux/reducers/users-reducer';

interface Props {
    users: UsersStateInterface;
    retrieveUsers(url: string): void;
}

function AdminUsers (props: Props) {
    const previousPageClickHandler = () => {
        // define search query inside retrieve users for encode uri component
        props.retrieveUsers(`/v1/users?page=${props.users.pagination.currentPage - 1}&q=${encodeURIComponent('')}`);
    }
    const nextPageClickHandler = () => {
        // define search query inside retrieve users for encode uri component
        props.retrieveUsers(`/v1/users?page=${props.users.pagination.currentPage + 1}&q=${encodeURIComponent('')}`);
    }
    return (
        <Container paddingOnly={true}>
             <Table
                headers={['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Actions']}
                content={
                    props.users.users!.map(el => [
                        el.id,
                        el.firstName,
                        el.lastName,
                        el.email,
                        el.role,
                        <div>actions</div>
                    ])
                }
                pagination={{
                    pages: props.users.pagination.pages,
                    currentPage: props.users.pagination.currentPage,
                    totalCount: props.users.pagination.totalCount
                }}
                previousPageClickHandler={previousPageClickHandler}
                nextPageClickHandler={nextPageClickHandler}
                progressIndicatorVisible={props.users.progressIndicatorVisible}
            />
        </Container>
    )
}

export default compose(
    withStoreConnection({stateProps: [users]})
)(AdminUsers)
