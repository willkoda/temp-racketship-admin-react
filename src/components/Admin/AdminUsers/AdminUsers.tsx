import React from 'react';
import './AdminUsers.scss';
import Container from '../../../elements/Container/Container';
import Table from '../../../elements/Table/Table';
import SearchInput from '../../../elements/SearchInput/SearchInput';
import IconButton from '../../../elements/IconButton/IconButton';

import {compose} from 'redux';
import withStoreConnection from '../../../hoc/withStoreConnection';
import {users} from '../../../auxiliary/state';
import {storeSetUsers} from '../../../auxiliary/dispatch';

import {UsersStateInterface} from '../../../redux/reducers/users-reducer';

import { 
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

interface Props {
    users: UsersStateInterface;
    retrieveUsers(url: string): void;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
}

function AdminUsers (props: Props) {
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
                                <IconButton iconElement={<EditIcon />} clickHandler={() => 'glick'} waveColor="rgba(0, 0, 0, 0.2)" color="var(--status--success--color)" />
                                <IconButton iconElement={<DeleteIcon />} clickHandler={() => 'delete button click'} waveColor="rgba(0, 0, 0, 0.2)" color="var(--dark-red)" />
                            </div>
                        ])
                    }
                    dataFiltrationComponent={
                        <div style={{backgroundColor: '#fff', padding: '20px 20px 0 20px', textAlign: 'left'}}>
                            <SearchInput searchCallback={searchCallback} id="filter-members" value={props.users.searchQuery} />
                        </div>
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
            </div>
        </Container>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUsers)