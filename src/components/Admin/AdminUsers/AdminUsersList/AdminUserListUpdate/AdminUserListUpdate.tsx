import React, {useState, useContext, useEffect} from 'react';
import Button from '../../../../../elements/Button/Button';
import Input, {ResultInterface} from '../../../../../elements/Input/Input';
import MobileNumberInput from '../../../../../elements/MobileNumberInput/MobileNumberInput';
import axios from '../../../../../auxiliary/axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import RadioGroup from '../../../../../elements/RadioGroup/RadioGroup';

import {compose} from 'redux';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {users} from '../../../../../auxiliary/state';
import {storeSetUsers} from '../../../../../auxiliary/dispatch';
import {UsersStateInterface} from '../../../../../redux/reducers/users-reducer';
import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../AdminModalProvider';

import { withStyles } from '@material-ui/core/styles';

interface Props {
    currentUser: any;
    users: UsersStateInterface;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
}
function AdminUserListUpdate({currentUser, users, storeSetUsers}: Props) {
    const noticeContext = useContext(AdminNoticeContext);
    const modalContext = useContext(AdminModalContext);
    const initialState = {value: '', valid: true, error: ''};
    const [loaderVisibility, setLoaderVisibility] = useState<'hidden' | 'visible'>('hidden');
    const [userID, setUserID] = useState(currentUser.id);
    const [firstName, setFirstName] = useState({...initialState, value: currentUser.firstName});
    const [lastName, setLastName] = useState({...initialState, value: currentUser.lastName});
    const [email, setEmail] = useState({...initialState, value: currentUser.email});
    const [mobileNumber, setMobileNumber] = useState({...initialState, value: currentUser.mobileNumber});
    const [password, setPassword] = useState({...initialState, valid: false, error: 'Password is too short; Enter at least 8 characters'});
    const [role, setRole] = useState({...initialState, value: currentUser.role});
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
            case 'mobileNumber':
                    setMobileNumber(newState);
                break;
            case 'password':
                    setPassword(newState);
                break;
            case 'role':
                    setRole(newState);
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
            email: email.value,
            mobile_number: mobileNumber.value,
            password: password.value,
            role: role.value
        }

        const result = [
            email,
            password,
            firstName,
            lastName,
            mobileNumber,
        ].map(e => e.valid);

        if (result.every(valid => valid)) {
            try {
                setLoaderVisibility('visible')
                const response = await axios.patch('/v1/users/' + userID, requestData);
                const {data} = response;
                setTimeout(() => {
                    setLoaderVisibility('hidden');
                    noticeContext.setNoticeText('Successfully updated user');
                    noticeContext.setNoticeState('success');
                    noticeContext.setNoticeTimestamp(Date.now());
                    modalContext.hideModal();
                    
                    const usersArray = [...users.users];
                    const index = usersArray.findIndex(el => el === currentUser)

                    usersArray.splice(index, 1, {
                        id: data.id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        mobileNumber: data.mobile_number,
                        role: data.role
                    });
                    storeSetUsers({
                        users: usersArray
                    })
                }, 1500)
                setPassword({...password, error: '', valid: true})
            } catch(error) {
                if (/index_users_on_email/.test(error.response.data.error)) {
                    setEmail({...email, valid: false, error: 'Email is already taken'});
                }
                setLoaderVisibility('hidden');
            }
        }
    }

    useEffect(() => {
        const initialState = {value: '', valid: true, error: ''};

        setUserID(currentUser.id);
        setFirstName({...initialState, value: currentUser.firstName});
        setLastName({...initialState, value: currentUser.lastName});
        setEmail({...initialState , value: currentUser.email});
        setPassword({...initialState})
        setMobileNumber({...initialState, value: currentUser.mobileNumber});
        setRole({...initialState, value: currentUser.role});
    },[currentUser, users.users])

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
                    validatedProps={{minLength: 3, english: true}}
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
                    validatedProps={{minLength: 3, english: true}}
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

                <Input
                    id="password"
                    inputBorderColor="var(--accent-one-shade-two)"
                    margin="margin-top-10"
                    placeholder="Password"
                    type="password"
                    value={password.value}
                    changeCallback={changeHandler}
                    validatedProps={{minLength: 8}}
                    valid={password.valid}
                    error={password.error}
                    timeStamp={timeStamp}
                />

                <MobileNumberInput 
                    change={changeHandler}
                    error={mobileNumber.error}
                    margin="margin-top-20"
                    id="mobileNumber"
                    timeStamp={timeStamp}
                    value={mobileNumber.value}
                    valid={mobileNumber.valid}
                />

                <div className="padding-top-bottom-10 text-align-left" style={{fontSize: '16px'}}>
                    <div className="margin-bottom-10">Role</div>
                    <RadioGroup
                        id="role"
                        name="role" 
                        initialValue={role.value}
                        changeCallback={changeHandler}
                        options={
                            [
                                {label: 'Staff', value: 'staff'},
                                {label: 'Owner', value: 'owner'},
                                {label: 'Admin', value: 'admin'}
                            ]
                        }
                    />
                 </div>

                <Button text="Submit" backgroundColor="accent--three" waveColor="rgba(0, 0, 0, 0.15)" padding="10px 12px" />
            </div>
        </form>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUserListUpdate);