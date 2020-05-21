import React, {useRef} from 'react';
import Button from '../../../../../../../elements/Button/Button';
import axios from '../../../../../../../auxiliary/axios';
import {RequestData} from '../../AdminTasksAvailableView';
import {Note} from '../AdminTasksAvailableViewPurchase';

interface Props {
    request: RequestData;
    noteRequestType: 'add' | 'edit';
    note?: Note;
    callback(note: Note): void;
}

function AdminTasksAvailableViewPurchasePlayerNote({request, note, callback, noteRequestType}: Props) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);
    const clickHandler = async () => {
        const {organization, user} = request;
        switch(noteRequestType) {
            case 'add': {
                    const response = await axios.post(`/v1/organizations/${organization.id}/members/${user.id}/player_notes`, {notes: textAreaRef.current.value});
                    callback(response.data);
                }
                break;
            case 'edit': {
                    const response = await axios.patch(`/v1/organizations/${organization.id}/members/${user.id}/player_notes/${note?.id}`, {notes: textAreaRef.current.value});
                    callback(response.data);
                }
                break;
            default: 
                throw new Error(`${noteRequestType} is not a valid note request type`);
        }
    }

    return (
        <div className="AdminTasksAvailableViewPurchasePlayerNote">
            <div className="content padding-20">
                <textarea className="margin-top-10 padding-10" ref={textAreaRef} defaultValue={note ? note.notes : ''}></textarea>
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