import React, {useState} from 'react';
import {ModalContextInterface, ModalDataInterface} from '../../elements/Modal/Modal';

interface Props {
    children: JSX.Element | Array<JSX.Element>
}

function AdminModalProvider(props: Props) {
    const initialState = {
        modalVisible: false,
        toggleModal: toggleModal,
        modalData: {
            header: 'Success',
            modalType: 'success',
            content: ''
        },
        setModalData: setModalData,
        hideModal: hideModal
    }

    const [modalState, setModalState] = useState(initialState);

    function toggleModal() {
        setModalState({...modalState, modalVisible: !modalState.modalVisible});
    }

    function hideModal() {
        setModalState({...modalState, modalVisible: false});
    }

    function setModalData(params: ModalDataInterface) {
        setModalState({
            ...modalState,
            modalData: params
        })
    }

    return (
        <AdminModalContext.Provider value={modalState}>
            {props.children}
        </AdminModalContext.Provider>
    )
}

export const AdminModalContext = React.createContext<ModalContextInterface>(null!);
export default AdminModalProvider;