import * as ActionTypes from "../ActionTypes.js"

const initState = {
    userName: "",
    receivedMessage: [],
    sendedMessage: [],
    connectedUsers: []
};

export default function(state = initState, action) {
    switch (action.type) {
    case ActionTypes.SendMessage:
        return Object.assign({},
            state,
            {
                sendedMessage: [...state.sendedMessage, { message: action.message, author: action.author }]
            });
    case ActionTypes.ReceivedMessage:
        return Object.assign({},
            state,
            {
                receivedMessage: [
                    ...state.receivedMessage, {
                        message: action.message,
                        author: action.author,
                        dateCreated: action.dateCreated
                    }
                ]
            });
    case ActionTypes.ConnectedUser:
        return Object.assign({},
            state,
            {
                connectedUsers: [
                    ...state.connectedUsers, {
                        userName: action.userName,
                        id: action.id
                    }
                ]
            });
    default:
        return state;
    }
}