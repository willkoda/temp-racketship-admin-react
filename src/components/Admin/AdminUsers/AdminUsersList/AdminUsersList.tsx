import React from 'react';
import Container from '../../../../elements/Container/Container';
import Table from '../../../../elements/Table/Table';
import IconButton from '../../../../elements/IconButton/IconButton';
import SearchInput from '../../../../elements/SearchInput/SearchInput';

import {compose} from 'redux';
import withStoreConnection from '../../../../hoc/withStoreConnection';
import {users} from '../../../../auxiliary/state';
import {storeSetUsers} from '../../../../auxiliary/dispatch';

import {UsersStateInterface} from '../../../../redux/reducers/users-reducer';
import axios from '../../../../auxiliary/axios';

import { 
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

interface Props {
    users: UsersStateInterface;
    retrieveUsers(url: string): void;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
}

function AdminUsersList(props: Props) {
    const previousPageClickHandler = () => {
        props.retrieveUsers(`/v1/users?page=${props.users.pagination.currentPage - 1}&q=${encodeURIComponent(props.users.searchQuery)}`);
    }
    const nextPageClickHandler = () => {
        props.retrieveUsers(`/v1/users?page=${props.users.pagination.currentPage + 1}&q=${encodeURIComponent(props.users.searchQuery)}`);
    }

    const searchCallback =  async (result: {eventType: string, value: string}) => {
        switch (result.eventType) {
            case 'immediate':
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

    const tableRowClickHandler = async (rowIndex: number) => {
        const response = await axios.get(`/v1/users/${rowIndex}`);
        console.log(response.data)
    }

    return (
        <Container paddingOnly={true}>
            <div className="AdminUsers">
                <Table
                    headers={['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Actions']}
                    content={
                        props.users.users!.map(el => [
                            el.id,
                            el.firstName,
                            el.lastName,
                            el.email,
                            el.role,
                            <div className="actions">
                                <IconButton iconElement={<EditIcon />} clickHandler={() => console.log('glick')} waveColor="rgba(0, 0, 0, 0.2)" color="var(--status--success--color)" />
                                <IconButton iconElement={<DeleteIcon />} clickHandler={() => console.log('delete button click')} waveColor="rgba(0, 0, 0, 0.2)" color="var(--dark-red)" />
                            </div>
                        ])
                    }
                    dataFiltrationComponent={
                        <div style={{backgroundColor: '#fff', padding: '20px 20px 0 20px', textAlign: 'left'}}>
                            <SearchInput searchCallback={searchCallback} id="filter-members" value={props.users.searchQuery} />
                        </div>
                    }
                    tableRowClickHandler={tableRowClickHandler}
                    pagination={{
                        pages: props.users.pagination.pages,
                        currentPage: props.users.pagination.currentPage,
                        totalCount: props.users.pagination.totalCount
                    }}
                    previousPageClickHandler={previousPageClickHandler}
                    nextPageClickHandler={nextPageClickHandler}
                    progressIndicatorVisible={props.users.progressIndicatorVisible}
                />
            </div>
        </Container>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUsersList)