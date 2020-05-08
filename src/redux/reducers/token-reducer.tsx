const initialState: TokenStateInterface = {
    accessToken: localStorage.getItem('admin--desk--admin__accessToken'),
    clientID: localStorage.getItem('admin--desk--admin__clientID'),
    uid: localStorage.getItem('admin--desk--admin__uid')
}

const actions = {
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    SET_TOKEN: 'SET_TOKEN'
}

interface ActionInterface {
    payload: TokenStateInterface,
    type: string
}

const storeToken = (payload: TokenStateInterface) => {
    Object.entries(payload).forEach(el => {
        if (el[1]) {
            localStorage.setItem('admin--desk--admin__' + el[0], el[1])
        }
    })
}

function reducer(state = initialState, action: ActionInterface) {
    switch (action.type) {
        case actions.REMOVE_TOKEN:
            localStorage.removeItem('admin--desk--admin__accessToken');
            localStorage.removeItem('admin--desk--admin__clientID');
            localStorage.removeItem('admin--desk--admin__uid');
            return {
                ...state,
                accessToken: null,
                clientID: null,
                uid: null
            }

        case actions.SET_TOKEN:
            storeToken(action.payload);
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state;
        }
    }
}
export interface TokenStateInterface {
    accessToken: string | null,
    clientID: string | null,
    uid: string | null
}
export default reducer;