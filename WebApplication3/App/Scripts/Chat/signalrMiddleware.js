import * as ActionTypes from "./ActionTypes.js";

export default function(store) {
    return (next) => (action) => {
        switch (action.type) {
            case ActionTypes.SendMessage:
                Hub.server.sendMessage(action.message);
                break;
        }
        return next(action);
    }
}