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
}

function AdminUsers(props: Props) {
    // const previousPageClickHandler = () => {
    //     props.retrieveMembers(`/members?page=${props.ownerMembers.pagination.currentPage - 1}&q=${encodeURIComponent(searchQuery)}`);
    // }
    // const nextPageClickHandler = () => {
    //     props.retrieveMembers(`/members?page=${props.ownerMembers.pagination.currentPage + 1}&q=${encodeURIComponent(searchQuery)}`);
    // }
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
                previousPageClickHandler={() => 'previous'}
                nextPageClickHandler={() => 'next'}
                progressIndicatorVisible={props.users.progressIndicatorVisible}
            />
        </Container>
    )
}

export default compose(
    withStoreConnection({stateProps: [users]})
)(AdminUsers);