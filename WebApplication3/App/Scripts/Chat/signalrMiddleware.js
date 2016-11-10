import * as ActionTypes from "./ActionTypes.js";

export default function(hub) {
    return (store) => (next) => (action) => {
        switch (action.type) {
            case ActionTypes.SendMessage:
                hub.server.sendMessage(action.message);
                break;
        }
        return next(action);
    }
}