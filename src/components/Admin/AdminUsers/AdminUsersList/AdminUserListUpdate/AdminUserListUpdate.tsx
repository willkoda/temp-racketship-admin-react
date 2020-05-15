import React, {useState, useContext} from 'react';
import Button from '../../../../../elements/Button/Button';
import Input, {ResultInterface} from '../../../../../elements/Input/Input';
import axios from '../../../../../auxiliary/axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import {compose} from 'redux';
import {users} from '../../../../../auxiliary/state';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {UsersStateInterface} from '../../../../../redux/reducers/users-reducer';
import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../AdminModalProvider';

import { withStyles } from '@material-ui/core/styles';

interface Props {
    userIndex: number | string;
    users: UsersStateInterface;
}
function AdminUserListUpdate({userIndex, users}: Props) {
    const noticeContext = useContext(AdminNoticeContext);
    const modalContext = useContext(AdminModalContext);
    const initialState = {value: '', valid: true, error: ''};
    const [loaderVisibility, setLoaderVisibility] = useState<'hidden' | 'visible'>('hidden');
    const [firstName, setFirstName] = useState({...initialState, value: users.users[+userIndex].firstName});
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
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeStamp(Date.now())
        const requestData = {
            first_name: firstName.value
        }
        try {
            setLoaderVisibility('visible')
            const response = await axios.patch('/v1/users/' + users.users[+userIndex].id, requestData);
            
            setTimeout(() => {
                setLoaderVisibility('hidden');
                noticeContext.setNoticeText('Successfully updated user');
                noticeContext.setNoticeState('success');
                noticeContext.setNoticeTimestamp(Date.now());
                modalContext.hideModal();
            }, 1500)
        } catch(error) {
            console.log(error)
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

                <Button text="Submit" backgroundColor="accent--three" waveColor="rgba(0, 0, 0, 0.15)" padding="10px 12px" />
            </div>
        </form>
    )
}

export default compose(
    withStoreConnection({stateProps: [users]})
)(AdminUserListUpdate);