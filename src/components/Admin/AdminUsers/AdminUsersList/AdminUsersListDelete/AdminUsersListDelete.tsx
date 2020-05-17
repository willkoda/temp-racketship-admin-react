import React, {useContext, useState} from 'react'
import './AdminUsersListDelete.scss';
import Button from '../../../../../elements/Button/Button';

import {UsersStateInterface} from '../../../../../redux/reducers/users-reducer';
import {compose} from 'redux';
import withStoreConnection from '../../../../../hoc/withStoreConnection';
import {users} from '../../../../../auxiliary/state';
import {storeSetUsers} from '../../../../../auxiliary/dispatch';

import {AdminModalContext} from '../../../AdminModalProvider';
import {AdminNoticeContext} from '../../../AdminNoticeProvider';
import axios from '../../../../../auxiliary/axios';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
    currentUser: any;
    users: UsersStateInterface;
    storeSetUsers(params: Partial<UsersStateInterface>): void;
}
function AdminUsersListDelete({currentUser, users, storeSetUsers}: Props) {
    const noticeContext = useContext(AdminNoticeContext);
    const modalContext = useContext(AdminModalContext);
    const [loaderVisibility, setLoaderVisibility] = useState<'hidden' | 'visible'>('hidden');
    const Progress = withStyles({
        colorPrimary: {
            backgroundColor: 'var(--accent-three-shade-one)',
          },
          barColorPrimary: {
            backgroundColor: 'var(--accent-three-shade-three)',
          },
    })(LinearProgress);
    return (
        <div className="AdminUsersListDelete">
            <Progress style={{visibility: loaderVisibility}} />
            <div className="padding-top-bottom-20 padding-left-right-15">
                <div>Are you sure you want to do this?</div> 
            </div>
            <div style={{backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '1px'}}></div>
            <div className="confirmation--buttons padding-top-bottom-20 padding-left-right-15">
                <Button 
                    buttonType="text" 
                    text="Cancel" 
                    backgroundColor="accent--three" 
                    waveColor="rgba(0, 0, 0, 0.15)" 
                    padding="10px 12px"
                    color="var(--accent-three-shade-two)"
                    clickCallback={
                        () => {
                            modalContext.hideModal();
                        }
                    }
                     />
                <Button 
                    text="Yes" 
                    backgroundColor="dark--red"
                    waveColor="rgba(0, 0, 0, 0.15)"
                    padding="10px 12px"
                    clickCallback={
                        async () => {
                            try {
                                setLoaderVisibility('visible');
                                await axios.delete('v1/users/' + currentUser.id);
                                setTimeout(() => {
                                    setLoaderVisibility('hidden');
                                    noticeContext.setNoticeText('The user has been deleted successfully');
                                    noticeContext.setNoticeState('success');
                                    noticeContext.setNoticeTimestamp(Date.now());
                                    modalContext.hideModal();

                                    const usersArray = [...users.users];
                                    const index = usersArray.findIndex(el => el === currentUser);
                                    usersArray.splice(index, 1)
                                    storeSetUsers({
                                        users: usersArray
                                    });
                                }, 1500)
                            } catch(error) {
                                console.log(error)
                                setLoaderVisibility('hidden');
                            }
                        }
                    }
                    />
            </div>
        </div>
    )
}

export default compose(
    withStoreConnection({stateProps: [users], dispatchProps: [storeSetUsers]})
)(AdminUsersListDelete);