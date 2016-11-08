import * as ActionTypes from "../ActionTypes.js"

export function sendMessage(message) {
    return (dispatch, getState) => {
        var userName = getState().Chat.userName;
        dispatch({
            type: ActionTypes.SendMessage,
            message: message,
            author: userName
        });
    }
}