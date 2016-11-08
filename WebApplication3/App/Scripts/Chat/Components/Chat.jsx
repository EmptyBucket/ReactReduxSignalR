import React from "react";
import {connect} from "react-redux";
import {bindActionsCreators} from "redux";
import * as ChatActions from "../Actions/ChatActions.js";
import ReactCssTransitionGroup from "react-addons-css-transition-group";

class Message extends React.Component {
    render() {
        return (<div>
            <div>
                {this.props.dateCreated} - {this.props.author}
            </div>
            <div>
                {this.props.message}
            </div>
        </div>);
    }
}

class MessageList extends React.Component {
    render() {
      const messages = this.props.messages.map(function(message) {
        return <Message author={message} message={message.message} dateCreated={message.dateCreated}/>;
      });
      return <div>
                   {messages}
               </div>;
  }
}

class UsersList extends React.Component {
    render() {
      const users = this.props.users.map(function(user) {
        return <li>{user.userName}</li>;
      });
      return <ul>
                   {users}
               </ul>;
  }
}

class Chat extends React.Component {
    render() {
        return (<div>
                    <div>
                        Вы вошли как: {this.props.userName}
                    </div>
                    <div>
                        Список пользователей
                        <UsersList users={this.props.users}/>
                    </div>
                    <div>
                        Список сообщения
                        <MessageList messages={this.props.messages}/>
                    </div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        users: state.Chat.connectedUsers,
        messages: [...state.Chat.receivedMessage, ...state.Chat.sendedMessage],
        userName: userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionsCreators(Chat, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps);