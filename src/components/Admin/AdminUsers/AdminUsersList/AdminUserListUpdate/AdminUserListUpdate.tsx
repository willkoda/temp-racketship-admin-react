import React, {useState, useContext} from 'react';
import Button from '../../../../../elements/Button/Button';
import Input, {ResultInterface} from '../../../../../elements/Input/Input';
import axios from '../../../../../auxiliary/axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import {compose} from 'redux';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {users} from '../../../../../auxiliary/state';
import {storeSetUsers} from '../../../../../auxiliary/dispatch';
import {UsersStateInterface} from '../../../../../redux/reducers/users-reducer';
import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../AdminModalProvider';

import { withStyles } from '@material-ui/core/styles';

interface Props {
    userIndex: number | string;
    users: UsersStateInterface;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
}
function AdminUserListUpdate({userIndex, users, storeSetUsers}: Props) {
    const user = users.users[+userIndex];
    const noticeContext = useContext(AdminNoticeContext);
    const modalContext = useContext(AdminModalContext);
    const initialState = {value: '', valid: true, error: ''};
    const [loaderVisibility, setLoaderVisibility] = useState<'hidden' | 'visible'>('hidden');
    const [firstName, setFirstName] = useState({...initialState, value: user.firstName});
    const [lastName, setLastName] = useState({...initialState, value: user.lastName});
    const [email, setEmail] = useState({...initialState, value: user.email})
    const [timeStamp, setTimeStamp] = useState(0);

    const Progress = withStyles({
        colorPrimary: {
            backgroundColor: 'var(--accent-three-shade-one)',
          },
          barColorPrimary: {
            backgroundColor: 'var(--accent-three-shade-three)',
          },
      })(LinearProgress);

    const changeHandler = (result: ResultInterface) => {
        const newState = {...result};
        delete newState.origin

        switch(result.origin) {
            case 'firstName':
                    setFirstName(newState);
                break;
            case 'lastName':
                    setLastName(newState);
                break;
            case 'email':
                    setEmail(newState);
                break;
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeStamp(Date.now())
        const requestData = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value
            //  :mobile_number, :role, :password, :current_password
        }
        try {
            setLoaderVisibility('visible')
            const response = await axios.patch('/v1/users/' + users.users[+userIndex].id, requestData);
            const {data} = response;
            setTimeout(() => {
                setLoaderVisibility('hidden');
                noticeContext.setNoticeText('Successfully updated user');
                noticeContext.setNoticeState('success');
                noticeContext.setNoticeTimestamp(Date.now());
                modalContext.hideModal();

                const usersArray = [...users.users];
                usersArray.splice(+userIndex, 1, {
                    id: data.id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    mobileNumber: data.mobile_number,
                    role: data.role
                })
                storeSetUsers({
                    users: usersArray
                })
            }, 1500)
        } catch(error) {
            if (/index_users_on_email/.test(error.response.data.error)) {
                setEmail({...email, valid: false, error: 'Email is already taken'});
                setLoaderVisibility('hidden');
            }
        }
    }

    return (
        <form onSubmit={submitForm}>
            <Progress style={{visibility: loaderVisibility}} />
            <div className="padding-top-bottom-20 padding-left-right-15">
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

                <Input 
                    id="lastName" 
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Last Name" 
                    value={lastName.value} 
                    changeCallback={changeHandler}
                    valid={lastName.valid} 
                    error={lastName.error}
                    timeStamp={timeStamp}
                    initialValue={lastName.value} />

                <Input 
                    id="email" 
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Email" 
                    value={email.value} 
                    changeCallback={changeHandler}
                    validatedProps={{email: true}}
                    valid={email.valid} 
                    error={email.error}
                    timeStamp={timeStamp}
                    initialValue={email.value} />

                <Button text="Submit" backgroundColor="accent--three" waveColor="rgba(0, 0, 0, 0.15)" padding="10px 12px" />
            </div>
        </form>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUserListUpdate);