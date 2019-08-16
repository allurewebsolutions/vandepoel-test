import * as actionTypes from '../actionTypes';

const initialState = {
    email: '',
    token: localStorage.token ? localStorage.token : '',
    error: null,
    isLoggedIn: null,
    redirectURL: '/event-registration'
};

/**
 * User reducer
 *
 * @param state
 * @param action
 * @returns {({redirectURL, isLoggedIn, error, email, token}&{isLoggedIn: boolean, error: *, token: string})|({redirectURL, isLoggedIn, error, email, token}&{isLoggedIn: boolean, email: *, token: *})|({redirectURL, isLoggedIn, error, email, token}&{isLoggedIn: boolean, error: *, token: *})|{redirectURL: string, isLoggedIn: null, error: null, email: string, token: string}|({redirectURL, isLoggedIn, error, email, token}&{isLoggedIn: (null|boolean|*), email: string})}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                email: action.email,
                isLoggedIn: true,
                token: action.token
            };
        case actionTypes.USER_REGISTER_FAIL:
            return {
                ...state,
                token: '',
                isLoggedIn: false,
                error: action.error
            };
        case actionTypes.USER_SIGNOUT_SUCCESS:
            return {
                ...state,
                email: '',
                isLoggedIn: action.isLoggedIn
            };
        case actionTypes.USER_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                error: action.error
            };
        default :
            return state;
    }
};
