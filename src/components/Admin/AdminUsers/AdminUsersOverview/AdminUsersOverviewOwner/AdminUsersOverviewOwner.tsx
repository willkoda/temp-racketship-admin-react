import React, {useEffect, useRef, useState} from 'react';
import {
    adminUsersOverviewRenderElements,
    UserOverviewPropsInterface
} from '../AdminUsersOverview';
import Table from '../../../../../elements/Table/Table';
import axios from '../../../../../auxiliary/axios';

interface Organization {
    id: number;
    identifier: string;
    name: string;
    url: string;
}

function AdminUsersOverviewOwner(props: UserOverviewPropsInterface) {
    const templateRef = useRef<HTMLDivElement>(null!);
    const {id} = props.userInformation;
    const [organizations, setOrganizations] = useState<Array<Organization>>([]);
    
    useEffect(() => {
        (async function() {
            const response = await axios.get(`/v1/users/${id}/organizations`);
            const {organizations} = response.data;
            if (templateRef.current) setOrganizations(organizations);
        })();
    }, [id]);

    return (
        <div className="AdminUsersOverviewOwner" ref={templateRef}>
            <h2 className="overview--heading">Owner Overview</h2>
            <div className="overview--boxes">
                <div className="box padding-bottom-10" style={{flex: '0 1 100%'}}>
                    <h3 className="box--heading">Account Details</h3>
                    <div className="box--details">
                        {adminUsersOverviewRenderElements({
                            keys: ['id', 'name', 'email', 'mobile_number', 'verified', 'verified_on', 'blocked', 'blocked_on'],
                            propObject: props.userInformation
                        })}
                    </div>
                </div>
            </div>
            <section className="purchase--requests margin-top-20" style={{width: '100%'}}>
                <Table 
                    tableName={<div className="table--name">
                        <span style={{
                            backgroundColor: 'var(--status--requested--background)',
                            color: 'var(--status--requested--color)',
                            }}>
                            Organizations
                        </span>
                    </div>}
                    headers={['ID', 'Name', 'Identifier', 'Link',]}
                    content={
                        organizations.map(el => [
                            el.id,
                            el.name,
                            el.identifier,
                            el.url
                        ])
                    }
                />
            </section>
        </div>
    )
}

export default AdminUsersOverviewOwner;