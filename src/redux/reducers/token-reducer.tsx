const initialState: TokenStateInterface = {
    accessToken: localStorage.getItem('accessToken'),
    clientID: localStorage.getItem('clientID'),
    uid: localStorage.getItem('uid')
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
            localStorage.setItem(el[0], el[1])
        }
    })
}

function reducer(state = initialState, action: ActionInterface) {
    switch (action.type) {
        case actions.REMOVE_TOKEN:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('clientID');
            localStorage.removeItem('uid');
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