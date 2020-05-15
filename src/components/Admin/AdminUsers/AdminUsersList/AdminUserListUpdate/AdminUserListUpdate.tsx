import React, {useState} from 'react';
import Button from '../../../../../elements/Button/Button';
import Input, {ResultInterface} from '../../../../../elements/Input/Input';

import {compose} from 'redux';
import {users} from '../../../../../auxiliary/state';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {UsersStateInterface} from '../../../../../redux/reducers/users-reducer';

interface Props {
    userIndex: number | string;
    users: UsersStateInterface;
}
function AdminUserListUpdate({userIndex, users}: Props) {
    const initialState = {value: '', valid: true, error: ''};
    const [firstName, setFirstName] = useState({...initialState, value: users.users[+userIndex].firstName});
    const [timeStamp, setTimeStamp] = useState(0);

    const changeHandler = (result: ResultInterface) => {
        const newState = {...result};
        delete newState.origin

        switch(result.origin) {
            case 'firstName':
                    setFirstName(newState);
                break;
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeStamp(Date.now())
        const requestData = {
            // :first_name, :last_name, :email, :mobile_number, :role, :password, :current_password
        }
    }

    return (
        <form onSubmit={submitForm}>
            <Input 
                id="firstName" 
                inputBorderColor="var(--accent-one-shade-two)"
                placeholder="First Name" 
                value={firstName.value} 
                changeCallback={changeHandler}
                valid={firstName.valid} 
                error={firstName.error}
                timeStamp={timeStamp}
                initialValue={firstName.value} />

            <Button text="Submit" backgroundColor="accent--three" waveColor="rgba(0, 0, 0, 0.15)" padding="10px 12px" />
        </form>
    )
}

export default compose(
    withStoreConnection({stateProps: [users]})
)(AdminUserListUpdate);

// export default AdminUserListUpdate;