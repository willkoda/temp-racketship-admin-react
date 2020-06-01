import React, {useState, useEffect, useContext} from 'react';

import axios from '../../../../auxiliary/axios';
import Container from '../../../../elements/Container/Container';
import Table from '../../../../elements/Table/Table';
import Button from '../../../../elements/Button/Button';
import {Pagination, Verification} from '../../AdminTasks/AdminTasks';
import {useParams} from 'react-router-dom';
import AdminTasksNewVerificationsUpdate from './AdminTasksNewVerificationsUpdate/AdminTasksNewVerificationsUpdate';

import {AdminModalContext} from '../../AdminModalProvider';
import {AdminNoticeContext} from '../../AdminNoticeProvider';

import IconButton from '../../../../elements/IconButton/IconButton';

import {
    Refresh as RefreshIcon,
    Visibility as VisibilityIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

interface Verifications {
    verifications: Array<Verification>;
    pagination: Pagination;
    progressIndicatorVisible?: boolean
}

function AdminTasksNewVerifications() {
    const adminModal = useContext(AdminModalContext);
    const notice = useContext(AdminNoticeContext);
    const {page} = useParams();
    const initialData = {pagination: {pages: 1, count:  0, current: 1}, verifications: [], progressIndicatorVisible: true};
    const [verifications, setVerifications] = useState<Verifications>({...initialData});

    useEffect(() => {
        const init = async () => {
            const response = await axios.get(`/v1/tasks/verifications?page=${page ? page : '1'}`);
            setVerifications({
                verifications: response.data.verifications,
                pagination: response.data.pagination,
            });
        }
        init();
    }, [page])

    return (
        <div className="AdminTasksNewVerifications" style={{height: 'inherit'}}>
            <Container paddingOnly={true}>
                <Table
                    headers={['ID', 'First Name', 'Last Name', 'Email', 'Number', 'Code', 'Organization', 'Actions']}
                    content={
                        verifications.verifications.map(el => [
                            el.id,
                            el.user.first_name,
                            el.user.last_name,
                            el.user.email,
                            el.user.mobile_number,
                            el.user.verification_code,
                            el.user.organization.name,
                            <div className="action--buttons">
                                <IconButton 
                                    color="var(--accent-one-shade-two)"
                                    waveColor="rgba(0, 0, 0, 0.2)"
                                    iconElement={<VisibilityIcon />} 
                                    clickHandler={
                                        (e: React.MouseEvent) => {
                                            const element = e.target as HTMLElement;
                                            const row = element.closest('tr');
                                            if (row) {
                                                const userIndex = row.dataset.rowIndex;
                                                const currentUser = verifications.verifications[+userIndex!].user;
                                                adminModal.setModalData({
                                                    header: 'Update User',
                                                    content: <AdminTasksNewVerificationsUpdate
                                                            key={currentUser.id}
                                                            currentUser={currentUser}
                                                            clickCallback={
                                                                (data) => {
                                                                    const verificationsArray = [...verifications.verifications];
                                                                    const index = verificationsArray.findIndex(el => el.user.id === data.id)

                                                                    verificationsArray.splice(index, 1, {
                                                                        id: data.id,
                                                                        user: {
                                                                            ...verificationsArray[index].user,
                                                                            first_name: data.first_name,
                                                                            last_name: data.last_name,
                                                                            email: data.email,
                                                                            mobile_number: data.mobile_number,
                                                                            role: data.role
                                                                        }
                                                                    })
                                                                    setVerifications({
                                                                        ...verifications,
                                                                        verifications: verificationsArray
                                                                    });
                                                                }
                                                            }
                                                        />,
                                                    confirmationText: 'Submit'
                                                })
                                                adminModal.toggleModal();
                                            }
                                        }
                                    } />

                                <IconButton 
                                    color="var(--complement-shade-two)"
                                    waveColor="rgba(0, 0, 0, 0.2)"
                                    iconElement={<RefreshIcon />} 
                                    clickHandler={async (e: React.MouseEvent) => {
                                        const element = e.target as HTMLElement;
                                        const row = element.closest('tr');

                                        if (row) {
                                            const userIndex = row.dataset.rowIndex;
                                            const currentUser = verifications.verifications[+userIndex!].user;

                                            const response = await axios.get(`/v1/users/${currentUser.id}/resend_code`);
                                            const {data} = response;
                                            notice.setNoticeText('Successfully resent verification code.');
                                            notice.setNoticeState('success');
                                            notice.setNoticeTimestamp(Date.now());

                                            const verificationsArray = [...verifications.verifications];
                                            const index = verificationsArray.findIndex(el => el.user.id === currentUser.id);

                                            verificationsArray.splice(index, 1, {
                                                ...verificationsArray[index],
                                                user: {
                                                    ...verificationsArray[index].user,
                                                    verification_code: data.new_verification_code
                                                }
                                            })

                                            setVerifications({
                                                ...verifications,
                                                verifications: verificationsArray
                                            });
                                        }
                                    }} />

                                <IconButton 
                                    color="var(--dark-red)"
                                    waveColor="rgba(0, 0, 0, 0.2)"
                                    iconElement={<DeleteIcon />} 
                                    clickHandler={
                                        (e: React.MouseEvent) => {
                                            const element = e.target as HTMLElement;
                                            const row = element.closest('tr');
                                            if (row) {
                                                const userIndex = row.dataset.rowIndex;
                                                const currentUser = verifications.verifications[+userIndex!].user;

                                                adminModal.setModalData({
                                                    header: 'Notice',
                                                    content: (
                                                        <div>
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
                                                                            adminModal.hideModal();
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
                                                                                // setLoaderVisibility('visible');
                                                                                setVerifications({
                                                                                    ...verifications,
                                                                                    progressIndicatorVisible: true
                                                                                })
                                                                                await axios.delete('v1/users/' + currentUser.id);
                                                                                setTimeout(() => {
                                                                                    notice.setNoticeText('The user has been deleted successfully');
                                                                                    notice.setNoticeState('success');
                                                                                    notice.setNoticeTimestamp(Date.now());
                                                                                    adminModal.hideModal();

                                                                                    setVerifications({
                                                                                        ...verifications,
                                                                                        progressIndicatorVisible: false
                                                                                    })

                                                                                    const verificationsArray = [...verifications.verifications];
                                                                                    const index = verificationsArray.findIndex(el => el.user.id === currentUser.id);

                                                                                    verificationsArray.splice(index, 1);
                                        
                                                                                    setVerifications({
                                                                                        ...verifications,
                                                                                        verifications: verificationsArray
                                                                                    });
                                                                                }, 1500)
                                                                            } catch(error) {
                                                                                console.log(error.response);
                                                                                setVerifications({
                                                                                    ...verifications,
                                                                                    progressIndicatorVisible: false
                                                                                })
                                                                            }
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ),
                                                    confirmationText: 'Submit'
                                                })
                                                adminModal.toggleModal();
                                            }
                                        }
                                    } 
                                />
                            </div>
                        ])
                    }
                    progressIndicatorVisible={verifications.progressIndicatorVisible}
                    pagination={{
                        pages: verifications.pagination.pages,
                        currentPage: verifications.pagination.current,
                        totalCount: verifications.pagination.count
                    }}
                />
            </Container>
        </div>
    )
}

export default AdminTasksNewVerifications;