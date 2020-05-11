const initialState: UsersStateInterface = {
    users: [],
    pagination: {
        nextUrl: '',
        previousUrl: '',
        currentPage: 0,
        pages: 0,
        totalCount: 0
    },
    searchQuery: '',
    progressIndicatorVisible: false
}

const actions = {
    SET_USERS: 'SET_USERS',
    REMOVE_USERS: 'REMOVE_USERS'
}

interface ActionInterface {
    payload: UsersStateInterface,
    type: string
}

function reducer(state = initialState, action: ActionInterface) {
    switch(action.type) {
        case actions.SET_USERS:
            return {
                ...state,
                ...action.payload
            };
        case actions.REMOVE_USERS:
            return {
                ...initialState
            };
        default: {
            return state;
        }
    }
}

export interface UsersStateInterface {
    users: Array<any>;
    pagination: {
        nextUrl: string,
        previousUrl: string,
        currentPage: number,
        pages: number,
        totalCount: number
    };
    searchQuery: string;
    progressIndicatorVisible: boolean
}

export default reducer;