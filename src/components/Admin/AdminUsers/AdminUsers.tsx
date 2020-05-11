import React from 'react';
import './AdminUsers.scss';
import Container from '../../../elements/Container/Container';
import Table from '../../../elements/Table/Table';
import SearchInput from '../../../elements/SearchInput/SearchInput';

import {compose} from 'redux';
import withStoreConnection from '../../../hoc/withStoreConnection';
import {users} from '../../../auxiliary/state';
import {storeSetUsers} from '../../../auxiliary/dispatch';

import {UsersStateInterface} from '../../../redux/reducers/users-reducer';

interface Props {
    users: UsersStateInterface;
    retrieveUsers(url: string): void;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
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

    const searchCallback =  async (result: {eventType: string, value: string}) => {
        switch (result.eventType) {
            case 'immediate':
                    // setSearchQuery(result.value)
                    props.storeSetUsers({
                        searchQuery: result.value
                    })
                break;
            case 'debounced':
                    props.storeSetUsers({
                        progressIndicatorVisible: true
                    });
                    props.retrieveUsers(`/v1/users?q=${encodeURIComponent(result.value)}`);
                break;
            default:
                throw new Error(`${result.eventType} is not a valid event type`)
        }
    }

    return (
        <Container paddingOnly={true}>
            <SearchInput searchCallback={searchCallback} id="filter-members" value={props.users.searchQuery} margin="margin-bottom-10" />
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
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUsers)
