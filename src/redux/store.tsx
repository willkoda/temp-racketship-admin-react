import {createStore, combineReducers} from 'redux';
import tokenReducer from './reducers/token-reducer';
import userReducer from './reducers/user-reducer';
import usersReducer from './reducers/users-reducer';
// import linkedAccountsReducer from './reducers/linked-accounts-reducer';

// import ownerMembersReducer from './reducers/owner/owner-members-reducer';
// import ownerBankAccountsReducer from './reducers/owner-bank-accounts-reducer';

// import memberPurchaseRequestsReducer from './reducers/member/member-purchase-requests-reducer';
// import memberCashOutsReducer from './reducers/member/member-cash-outs-reducer';

// import pageConfigurationReducer from './reducers/page-configuration-reducer';

const mainReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    users: usersReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
    }
}

const store = createStore(mainReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;