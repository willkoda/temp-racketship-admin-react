import React, {useState, useContext} from 'react';

import Input, {ResultInterface} from '../../../../../elements/Input/Input';
import Button from '../../../../../elements/Button/Button';
import MobileNumberInput from '../../../../../elements/MobileNumberInput/MobileNumberInput';
import RadioGroup from '../../../../../elements/RadioGroup/RadioGroup';
import {User} from '../../AdminTasks';

import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../AdminModalProvider';

import axios from '../../../../../auxiliary/axios';

interface Props {
    currentUser: any;
    clickCallback(data: User): void;
}

function AdminTasksNewVerificationsUpdate({currentUser, clickCallback}: Props) {
    const [loaderVisibility, setLoaderVisibility] = useState<'hidden' | 'visible'>('hidden');
    const initialState = {value: '', valid: true, error: ''};
    const [firstName, setFirstName] = useState({...initialState, value: currentUser.first_name});
    const [lastName, setLastName] = useState({...initialState, value: currentUser.last_name});
    const [email, setEmail] = useState({...initialState, value: currentUser.email});
    const [mobileNumber, setMobileNumber] = useState({...initialState, value: currentUser.mobile_number});
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

    const notice = useContext(AdminNoticeContext);
    const modal = useContext(AdminModalContext);

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
                const response = await axios.patch('/v1/users/' + currentUser.id, requestData);
                const {data} = response;
                setTimeout(() => {
                    setLoaderVisibility('hidden');
                    notice.setNoticeText('Successfully updated user');
                    notice.setNoticeState('success');
                    notice.setNoticeTimestamp(Date.now());
                    modal.hideModal();

                    clickCallback(data);
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

                <MobileNumberInput 
                    change={changeHandler}
                    error={mobileNumber.error}
                    margin="margin-top-20"
                    id="mobileNumber"
                    timeStamp={timeStamp}
                    value={mobileNumber.value}
                    valid={mobileNumber.valid}
                />

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

export default AdminTasksNewVerificationsUpdate;