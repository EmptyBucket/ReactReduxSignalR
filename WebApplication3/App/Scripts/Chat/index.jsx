import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import RootReducer from "./Reducers/index.js";
import Chat from "./Components/Chat.jsx";
import SignalrMiddleware from "./signalrMiddleware.js";

const store = createStore(RootReducer, applyMiddleware(Thunk, SignalrMiddleware));

const Hub = $.connection.chat;

hub.client.onConnectedUser = (user) => store.dispatch({
  type: ActionTypes.ConnectedUser,
  userName: user.UserName,
  id: user.Id
});

hub.client.receiveMessage = (message) => store.dispatch({
  type: ActionTypes.ReceivedMessage,
  userName: message.UserName,
  message: message.Message,
  dateCreated: message.DateCreated
});

$.connection.hub.start()
  .done(() => render(
    <Provider store={store}>
      <Chat/>
    </Provider>,
    document.getElementById("chatContainer")));