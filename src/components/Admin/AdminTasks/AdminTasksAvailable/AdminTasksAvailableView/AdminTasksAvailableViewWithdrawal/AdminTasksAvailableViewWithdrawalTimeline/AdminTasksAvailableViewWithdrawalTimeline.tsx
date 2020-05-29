import React, {useEffect, useState, useContext} from 'react';
import {RequestData, Activity} from '../../../../AdminTasks';
import axios from '../../../../../../../auxiliary/axios';
import Timeline from '../../../../../../../elements/Timeline/Timeline';
import Button from '../../../../../../../elements/Button/Button';

import {AdminNoticeContext} from '../../../../../AdminNoticeProvider';
import {AdminModalContext} from '../../../../../AdminModalProvider';

import {formatName} from '../../../../../../../auxiliary/functions/format-name';
import {useHistory} from 'react-router-dom';

import camera from '../../../../../../../assets/images/camera.svg';
import chip from '../../../../../../../assets/images/chip.svg';
import lock from '../../../../../../../assets/images/lock.svg';
import unlock from '../../../../../../../assets/images/unlock.svg';
import hand from '../../../../../../../assets/images/hand.svg';
import safetyDepositBox from '../../../../../../../assets/images/safety-deposit-box.svg';

import { 
    VerifiedUser as VerifiedUserIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Flag as FlagIcon
} from '@material-ui/icons';

interface Props {
    request: RequestData;
}

function AdminTasksAvailableViewWithdrawalTimeline({request}: Props) {
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const adminNotice = useContext(AdminNoticeContext);
    const adminModal = useContext(AdminModalContext);
    const history = useHistory();
    useEffect(() => {
        const init = async () => {
            const response = await axios.get(`/v1/withdrawal_requests/${request.id}/activity`);
            const {activities} = response.data;
            setActivities(activities);
        }
        init();
    }, [request])

    return (
        <div className="AdminTasksAvailableViewWithdrawalTimeline">
            <div className="overview--boxes">
                <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                    <h3 className="box--heading">
                        Request Timeline
                    </h3>
                    <div className="box--details">
                        <div className="padding-left-15">
                            <Timeline
                                timeLineItems={
                                    activities.map(el => {
                                        let action = el.key.split('.')[1].split('_').join(' ');
                                        let content = `${action.charAt(0).toUpperCase() + action.slice(1)} by ${formatName(el.owner.first_name , el.owner.last_name)}`;
                                        let iconElement;

                                        switch(action) {
                                            case 'chips sent':
                                                iconElement = <img src={chip} alt="chips sent" />
                                                break;
                                            case 'chips taken':
                                                iconElement = <img src={hand} alt="take chips" />
                                                break;
                                            case 'completed':
                                                iconElement = <CheckIcon style={{color: 'var(--status--success--color)'}} />
                                                break;
                                            case 'deposit sent':
                                                iconElement = <img src={safetyDepositBox} alt="safety-deposit-box" />
                                                break;
                                            case 'flagged':
                                                iconElement = <FlagIcon />
                                                break;
                                            case 'locked':
                                                iconElement = <img src={lock} alt="locked" />
                                                break;
                                            case 'set as failed':
                                                iconElement = <CloseIcon />
                                                break;
                                            case 'screenshot verified':
                                                iconElement = <img src={camera} alt="screenshot verified" />
                                                break;
                                            case 'unlocked':
                                                iconElement = <img src={unlock} alt="unlocked" />
                                                break;
                                            default:
                                                iconElement = <VerifiedUserIcon />
                                        }

                                        return {
                                            date: el.timestamp,
                                            content: content,
                                            iconElement: iconElement
                                        }
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                    <h3 className="box--heading" style={{
                        backgroundColor: 'var(--primary)',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                    }}>
                        <span style={{color: '#fff'}}>Administrator Actions</span>
                    </h3>
                    <div className="box--details">
                        <Button
                            text="Mark as Success"
                            waveColor="rgba(0, 0, 0, 0.2)"
                            backgroundColor="status--success"
                            width="130px"
                            margin="margin-right-10"
                            clickCallback={
                                async () => {
                                    try {
                                        await axios.get(`/v1/withdrawal_requests/${request.id}/complete`);
                                        adminNotice.setNoticeText('The task has been marked as a success.');
                                        adminNotice.setNoticeState('success');
                                        adminNotice.setNoticeTimestamp(Date.now());
                                        history.goBack();
                                    } catch(error) {
                                        console.log(error.response)
                                        adminModal.setModalData({
                                            header: 'Notice',
                                            content: (
                                                <div className="padding-top-bottom-20">
                                                    <p className="padding-left-right-20 padding-bottom-20">Please perform any of the above actions before marking this task.</p>
                                                    <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                        <Button
                                                            text="Ok"
                                                            waveColor="rgba(0, 0, 0, 0.2)"
                                                            backgroundColor="status--approved"
                                                            width="120px"
                                                            clickCallback={() => { adminModal.hideModal()}}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                            confirmationText: 'Ok'
                                        });
                                        adminModal.toggleModal();
                                    }
                                }
                            }
                        />

                        <Button
                            text="Mark as Failure"
                            waveColor="rgba(0, 0, 0, 0.2)"
                            backgroundColor="dark--red"
                            width="130px"
                            clickCallback={
                                async () => {
                                    try {
                                        await axios.get(`/v1/withdrawal_requests/${request.id}/fail`);
                                        adminNotice.setNoticeText('The task has been marked as a failure.');
                                        adminNotice.setNoticeState('success');
                                        adminNotice.setNoticeTimestamp(Date.now());
                                        history.goBack();
                                    } catch(error) {
                                        adminModal.setModalData({
                                            header: 'Notice',
                                            content: (
                                                <div className="padding-top-bottom-20">
                                                    <p className="padding-left-right-20 padding-bottom-20">Please lock this task before marking it as a failure.</p>
                                                    <div className="button--container padding-top-20" style={{borderTop: '1px solid rgba(0, 0, 0, 0.2)'}}>
                                                        <Button
                                                            text="Ok"
                                                            waveColor="rgba(0, 0, 0, 0.2)"
                                                            backgroundColor="status--approved"
                                                            width="120px"
                                                            clickCallback={() => { adminModal.hideModal()}}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                            confirmationText: 'Ok'
                                        });
                                        adminModal.toggleModal();
                                    }
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminTasksAvailableViewWithdrawalTimeline;