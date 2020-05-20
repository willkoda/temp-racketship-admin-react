import React, {useRef} from 'react';
import Button from '../../../../../../../elements/Button/Button';
import axios from '../../../../../../../auxiliary/axios';
import {RequestData} from '../../AdminTasksAvailableView';

interface Props {
    request: RequestData;
}

function AdminTasksAvailableViewPurchasePlayerNote({request}: Props) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);
    const clickHandler = async () => {
        const {organization, user} = request;
        const response = await axios.post(`/v1/organizations/${organization.id}/members/${user.id}/player_notes`, textAreaRef.current.value);
    }

    return (
        <div className="AdminTasksAvailableViewPurchasePlayerNote">
            <div className="content padding-20">
                <textarea className="margin-top-10 padding-10" ref={textAreaRef}></textarea>
                <Button
                    text="Submit"
                    waveColor="rgba(0, 0, 0, 0.2)"
                    backgroundColor="accent--three"
                    width="120px"
                    padding="8px 10px"
                    clickCallback={clickHandler}
                    margin="margin-top-10"
                />
            </div>
        </div>
    )
}

export default AdminTasksAvailableViewPurchasePlayerNote;