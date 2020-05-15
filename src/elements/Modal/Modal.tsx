import React, {useEffect, useContext, useRef} from 'react';
import './Modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '../../elements/IconButton/IconButton';

interface Props {
    context: React.Context<ModalContextInterface>
}

function Modal(props: Props) {
    const modalRef = useRef<HTMLDivElement>(null!);
    const windowRef = useRef<HTMLDivElement>(null!);
    const context = useContext(props.context);
    useEffect(() => { 
        if (context.modalVisible) {
            modalRef.current.style.zIndex = '15';
            setTimeout(() => {
                if (modalRef.current) modalRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            }, 100);
        } else {
            modalRef.current.style.backgroundColor = 'transparent';
            setTimeout(() => {
                if (modalRef.current) modalRef.current.style.zIndex = '-1';
            }, 280);
        }
    }, [context.modalVisible]);

    useEffect(() => {
        if (context.modalVisible) {
            windowRef.current.style.top = '45%';
            windowRef.current.style.opacity = '1';
        } else {
            windowRef.current.style.top = '43%';
            windowRef.current.style.opacity = '0';
        }
    }, [context.modalVisible])

    const modalClickHandler = (e: React.MouseEvent) => {
        if (e.target === modalRef.current) context.hideModal();
    }

    const confirmationHandler = () => {
        if (context.modalData) {
            if (context.modalData.confirmationCallback) context.modalData.confirmationCallback();
        }
    }
    
    return (
        <div className="Modal" ref={modalRef} onClick={modalClickHandler}>
            <div className="modal--window" ref={windowRef}>
                <div className="modal--header">
                    <span>{context.modalData ? context.modalData.header || 'Confirm' : 'Confirm'}</span>
                    <IconButton 
                        color="var(--dark-text)"
                        waveColor="rgba(0, 0, 0, 0.3)"
                        iconElement={<CloseIcon />} 
                        clickHandler={() => {context.hideModal()}}
                    />
                </div>
                <div className="modal--content">
                        {context.modalData ? context.modalData.content || 'Request Successful' : 'Request successful!'}
                    <div className="">
                    </div>
                </div>
            </div>
        </div>
    )
}

export interface ModalDataInterface {
    header: string;
    modalType: 'success' | 'confirmation';
    content: JSX.Element;
    confirmationCallback?(): void;
    confirmationText?: string;
}

export interface ModalContextInterface {
    modalVisible: boolean;
    toggleModal(): void;
    modalData: ModalDataInterface;
    setModalData(params: ModalDataInterface): void;
    hideModal(): void;
}

export default Modal;