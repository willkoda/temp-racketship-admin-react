import React, {useState} from 'react';
import {ModalContextInterface, ModalDataInterface} from '../../elements/Modal/Modal';

interface Props {
    children: JSX.Element | Array<JSX.Element>
}

function AdminModalProvider(props: Props) {   
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<ModalDataInterface>({header: 'Success', content: <div></div>});

    function toggleModal() {
        setModalVisible(!modalVisible);
    }

    function hideModal() {
        setModalVisible(false);
    }

    const state = {
        modalVisible: modalVisible,
        toggleModal: toggleModal,
        modalData: modalData,
        setModalData: setModalData,
        hideModal: hideModal
    }

    return (
        <AdminModalContext.Provider value={state}>
            {props.children}
        </AdminModalContext.Provider>
    )
}

export const AdminModalContext = React.createContext<ModalContextInterface>(null!);
export default AdminModalProvider;