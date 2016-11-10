import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
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

class MessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }
    sendMessage() {
        this.props.sendMessage(this.state.text);
    }
    textChange(event) {
        this.setState({ text: event.target.value });
    }
    render() {
        return (<div>
            <div>
                <input onChange={this.textChange.bind(this)} value={this.state.text} type="text"/>
            </div>
            <div>
                <input type="submit" onClick={this.sendMessage.bind(this)}/>
            </div>
        </div>)
    }
}

class Chat extends React.Component {
    sendMessage(text) {
        this.props.actions.sendMessage(text);
    }
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
                    <div>
                        <MessageSender sendMessage={this.sendMessage.bind(this)} />
                    </div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        users: state.Chat.connectedUsers,
        messages: [...state.Chat.receivedMessage, ...state.Chat.sendedMessage],
        userName: state.Chat.userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ChatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);