const nullState: UserStateInterface = {
    email: null,
    firstName: null,
    id: null,
    lastName: null,
    mobileNumber: null,
    role: null,
    verified: null,
    verifiedOn: null
}

const userInformation = JSON.parse(localStorage.getItem('user')!) || nullState;

const initialState: UserStateInterface = {...userInformation};

const actions = {
    SET_USER: 'SET_USER',
    SET_MOBILE_NUMBER: 'SET_MOBILE_NUMBER',
    REMOVE_USER: 'REMOVE_USER',
    VERIFY_USER: 'VERIFY_USER'
}

interface ActionInterface {
    payload: UserStateInterface,
    type: string
}

function reducer(state = initialState, action: ActionInterface) {
    switch (action.type) {
        case actions.REMOVE_USER:
            localStorage.removeItem('user');
            return {
                ...state,
                ...nullState
            }
        case actions.SET_USER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                ...action.payload
            }
        case actions.SET_MOBILE_NUMBER: {
            const newState = {
                ...state,
                ...action.payload
            };
            localStorage.setItem('user', JSON.stringify(newState));
            return newState;
        }
        default: {
            return state;
        }
    }
}

export interface UserStateInterface {
    email: string | null,
    firstName: string | null,
    id: number | null,
    lastName: string | null,
    mobileNumber: string | null,
    role: string | null,
    verified: boolean | null,
    verifiedOn: string | null
}

export default reducer;

