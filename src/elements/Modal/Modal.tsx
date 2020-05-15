import React, {useEffect, useContext, useRef} from 'react';
import './Modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '../../elements/IconButton/IconButton';
import Button from '../../elements/Button/Button';

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
                </div>
                {/* <div className="modal--footer">
                    {context.modalData ? context.modalData.modalType === 'confirmation' ? <div className="modal--buttons confirmation">
                        <Button 
                            backgroundColor="accent--three" 
                            text="Cancel" 
                            buttonType="text"
                            color="var(--accent-three-shade-two)" 
                            margin="margin-right-10"
                            clickCallback={() => context.toggleModal()}
                            waveColor="rgba(0, 0, 0, 0.3)"
                             />
                        <Button
                            backgroundColor="accent--three"
                            text= {context.confirmationText || "Yes"} 
                            color="#fff"
                            clickCallback={confirmationHandler} 
                            margin="margin-0"
                            waveColor="rgba(0, 0, 0, 0.3)"
                            />
                    </div> : null : null}

                    {context.modalData ? context.modalData.modalType === 'success' ? <div className="modal--buttons success">
                        <Button
                            backgroundColor="accent--three"
                            text="Ok"
                            color="#fff"
                            margin="margin-0"
                            clickCallback={confirmationHandler}
                            waveColor="rgba(0, 0, 0, 0.3)"
                            />
                    </div> : null : null}
                </div> */}
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