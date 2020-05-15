import React from 'react';

interface Props {
    userIndex: number | string | undefined
}
function AdminUserListUpdate(props: Props) {
    const submitForm = () => {
        console.log('sub')
    }

    return (
        <form onSubmit={submitForm}>
            <div>fatform</div>
        </form>
    )
}

export default AdminUserListUpdate;