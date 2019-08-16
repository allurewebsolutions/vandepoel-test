import * as actionTypes from "./actionTypes";
import * as API from '../helpers/api'

/**
 * Register function
 *
 * @returns {function(*): boolean}
 */
export const register = (user) => {
    return async (dispatch) => {
        let success = false;

        await API.mockRegistration
            .then(response => {
                // if user is assigned to a client ID or is an admin
                if (response.token) {
                    // set token and email in local storage, so data persists even after reload
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('email', user.email);

                    // dispatch action to redux
                    dispatch({
                        type: actionTypes.USER_REGISTER_SUCCESS,
                        token: response.token,
                        email: user.email
                    });

                    success = true;
                }
                // if user is not assigned to a client ID, send error
                else {
                    dispatch({
                        type: actionTypes.USER_REGISTER_FAIL,
                        error: 'Registration failed. Please try again.'
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.USER_REGISTER_FAIL,
                    error: error.message
                });
            });


        return success;
    }
};
/**
 * Event function
 *
 * @returns {function(*): boolean}
 */
export const eventRegistration = () => {
    return async (dispatch) => {
        let success = false;

        await API.mockRegistration
            .then(response => {
                // if user is assigned to a client ID or is an admin
                if (response.token) {
                    // dispatch action to redux
                    dispatch({
                        type: actionTypes.REGISTRATION_SUCCESS
                    });

                    success = true;
                }
                // if user is not assigned to a client ID, send error
                else {
                    dispatch({
                        type: actionTypes.REGISTRATION_FAIL,
                        error: 'Event registration failed. Please try again.'
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.REGISTRATION_FAIL,
                    error: error.message
                });
            });


        return success;
    }
};

/**
 * Logout function
 *
 * @returns {Function}
 */
export const userLogout = () => {
    return dispatch => {
        // clear local storage
        localStorage.removeItem('token');

        // dispatch action to redux
        dispatch({
            type: actionTypes.USER_SIGNOUT_SUCCESS,
            isLoggedIn: false
        });
    }
};

/**
 * Set logged in state
 *
 * @returns {Function}
 */
export const userLoggedIn = token => {
    return dispatch => {
        if (token) {
            // simulate token validation
            if (token.length === 16) {
                // dispatch action to redux
                dispatch({
                    type: actionTypes.USER_LOGGED_IN,
                    isLoggedIn: true,
                    token: localStorage.token
                });
            }
            // token is invalid
            else {
                // clear local storage
                localStorage.removeItem('token');

                // dispatch action to redux
                dispatch({
                    type: actionTypes.USER_SIGNOUT_SUCCESS,
                    isLoggedIn: false,
                    error: 'User token is not valid and user was logged out.'
                });
            }
        } else {
            dispatch({
                type: actionTypes.USER_SIGNOUT_SUCCESS,
                isLoggedIn: false
            });
        }
    }
};


