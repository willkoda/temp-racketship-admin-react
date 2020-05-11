import React from 'react';
import {connect} from 'react-redux';
import {
    storeSetToken,
    storeRemoveToken,
    storeSetUser,
    storeRemoveUser,
    storeSetUsers,
    storeRemoveUsers
} from '../auxiliary/dispatch';
import {token, user, users} from '../auxiliary/state';

import {TokenStateInterface} from '../redux/reducers/token-reducer';
import {UserStateInterface} from '../redux/reducers/user-reducer';
import {UsersStateInterface} from '../redux/reducers/users-reducer';

type indexSignature = {
    [key: string]: any
};
export default function withStoreConnection(params: {stateProps?: Array<String>, dispatchProps?: Array<String>}) {
    const mapStateToProps = (state: any) => {
        const storeState: indexSignature = {
            [token]: state[token],
            [user]: state[user],
            [users]: state[users]
        }
        if (!params.stateProps) return {};
        return params.stateProps.reduce((acc: Object, curr: any) => {
            if (Object.prototype.hasOwnProperty.call(storeState, curr)) {
                return {
                    ...acc,
                    ...{[curr]: storeState[curr]}
                }
            } else {
                throw new Error(`${curr} property is not in storeState`);
            }
        }, {});
    };
    
    const mapDispatchToProps = (dispatch: Function) => {
        const storeDispatch: indexSignature = {
            [storeSetToken]: (responseObject: TokenStateInterface) => dispatch({type: 'SET_TOKEN', payload: responseObject}),
            [storeRemoveToken]: () => dispatch({type: 'REMOVE_TOKEN'}),
            [storeSetUser]: (userInformation: UserStateInterface) => dispatch({type: 'SET_USER', payload: userInformation}),
            [storeRemoveUser]: () => dispatch({type: 'REMOVE_USER'}),

            [storeSetUsers]: (payload: Partial<UsersStateInterface>) => dispatch({type: 'SET_USERS', payload: payload}),
            [storeRemoveUsers]: () => dispatch({type: 'REMOVE_USERS'})
        };
        if (!params.dispatchProps) return {};
        return params.dispatchProps.reduce((acc: Object, curr: any) => {
            if (Object.prototype.hasOwnProperty.call(storeDispatch, curr)) {
                return {
                    ...acc,
                    ...{[curr]: storeDispatch[curr]}
                }
            } else {
                throw new Error(`${curr} property is not in storeDispatch`);
            }
        }, {});
    };

    return function (Component: any) {
        function EnhancedComponent(props: any) {
            return <Component {...props} />
        }
        return connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
    }
}