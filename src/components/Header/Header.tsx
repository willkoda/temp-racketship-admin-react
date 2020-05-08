import React from 'react';
import AdminHeader from './AdminHeader/AdminHeader';

interface Props {
    headerType: 'admin' | 'staff'
}

function Header(props: Props) {
    return props.headerType === 'admin' ? <AdminHeader /> : null
}

export default Header;