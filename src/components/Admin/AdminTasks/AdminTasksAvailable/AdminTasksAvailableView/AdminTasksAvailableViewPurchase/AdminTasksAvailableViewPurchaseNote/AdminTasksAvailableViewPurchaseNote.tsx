import React, {useContext, useRef} from 'react';
import './AdminTasksAvailableViewPurchaseNote.scss';
import Button from '../../../../../../../elements/Button/Button';
import axios from '../../../../../../../auxiliary/axios';
import {RequestData} from '../../AdminTasksAvailableView'
import {AdminModalContext} from '../../../../../AdminModalProvider';
import {AdminNoticeContext} from '../../../../../AdminNoticeProvider';

interface Props {
    request: RequestData;
    updateNotesCallback(request: RequestData): void;
}

function AdminTasksAvailableViewPurchaseNote({request, updateNotesCallback}: Props) {
    const adminModal = useContext(AdminModalContext);
    const adminNotice = useContext(AdminNoticeContext);

    const updateRequestNote = async (note: string) => {
        const response = await axios.post(`/v1/purchase_requests/${request.id}/flag`, { notes: note })
        updateNotesCallback(response.data)
        adminModal.hideModal();
        adminNotice.setNoticeText('Successfully updated notes for the request');
        adminNotice.setNoticeState('success');
        adminNotice.setNoticeTimestamp(Date.now());
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null!);

    return (
        <div className="AdminTasksAvailableViewPurchaseNote">
            <div className="content padding-20">
                <h2 className="content--heading">Quick Actions</h2>
                <div className="action--buttons margin-top-10">
                    <Button
                        text="Duplicate Deposit"
                        waveColor="rgba(0, 0, 0, 0.2)"
                        backgroundColor="status--success"
                        width="200px"
                        clickCallback={() => {updateRequestNote('Duplicate Deposit')}}
                    />

                    <Button
                        text="Large Amount Deposited"
                        waveColor="rgba(0, 0, 0, 0.2)"
                        backgroundColor="status--success"
                        width="200px"
                        clickCallback={() => {updateRequestNote('Large Amount Deposited')}}
                    />

                    <Button
                        text="Image Seems Edited"
                        waveColor="rgba(0, 0, 0, 0.2)"
                        backgroundColor="status--success"
                        width="200px"
                        clickCallback={() => {updateRequestNote('Image Seems Edited')}}
                    />
                    <textarea defaultValue={request?.notes} placeholder="Enter note here" className="margin-top-10 padding-10" ref={textAreaRef}></textarea>

                    <Button
                        text="Submit"
                        waveColor="rgba(0, 0, 0, 0.2)"
                        backgroundColor="accent--three"
                        width="120px"
                        padding="8px 10px"
                        clickCallback={() => {updateRequestNote(textAreaRef.current.value)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminTasksAvailableViewPurchaseNote;