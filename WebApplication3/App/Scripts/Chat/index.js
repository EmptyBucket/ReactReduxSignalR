import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import RootReducer from "./Reducers/index.js";
import Chat from "./Components/Chat.js";
import SignalrMiddleware from "./signalrMiddleware.js";

window.jQuery = $;
require('ms-signalr-client');

new Promise(function(resolve) {
  $.get("/signalr/hubs", function() { resolve() });
})
.then(function() {
  var chat = $.connection.chatHub

  chat.client.onConnectedUser = (user) => store.dispatch({
    type: ActionTypes.ConnectedUser,
    userName: user.UserName,
    id: user.Id
  });

  chat.client.receiveMessage = (message) => store.dispatch({
    type: ActionTypes.ReceivedMessage,
    userName: message.UserName,
    message: message.Message,
    dateCreated: message.DateCreated
  });

  const store = createStore(RootReducer, applyMiddleware(Thunk, SignalrMiddleware(chat)));

  $.connection.hub.start()
    .done(() => render(
      <Provider store={store}>
        <Chat/>
      </Provider>,
      document.getElementById("chatContainer")));
})


