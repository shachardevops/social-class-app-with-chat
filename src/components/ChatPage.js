import React from 'react';
import { StyleSheet, Platform, StatusBar, ImageBackground } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import backgroundImage from '../assets/chat.jpg';
import Header from './Header';
import { Container, Drawer } from 'native-base';
import SideBar from './ManuBar';

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      chatId: this.props.user.classRoom.name,
      users: [],
      image: ''
    };
    this.socket = SocketIOClient('http://localhost:3001');
    this.socket.on('message', this.onReceivedMessage);
    this.socket.on('updateUserList', users => {
      this.setState({ users });
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
  }
  componentWillUnmount = () => {
    this.socket.disconnect(true);
  };
  componentDidMount = async () => {
    const image = await this.props.user.image;
    this.determineUser();
    this.setState({
      image
    });
  };
  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser = async () => {
    const userId = await this.props.user.id;
    const chatId = await this.props.user.classRoom.name;
    console.log(chatId);

    await this.socket.emit('userJoined', { userId, chatId });

    this.setState({ userId, chatId });
  };

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage = messages => {
    this._storeMessages(messages);
  };

  /*
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend = (messages = []) => {
    this.socket.emit('message', {
      message: messages[0],
      chatId: this.state.chatId
    });
    this._storeMessages(messages);
  };

  render() {
    const user = {};
    const path = this.props.user.teacher ? 'teacherPage' : 'studentPage';
    return (
      <Container>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              navigator={this.navigator}
              name={this.props.user.name}
              history={this.props.history}
              onlineUsers={this.state.users}
              chatPage={true}
            />
          }
          onClose={() => this.drawer._root.close()}
        >
          <Header
            drawer={this.drawer}
            path={path}
            viewMode={this.state.viewMode}
            history={this.props.history}
            header={this.props.user.classRoom.name}
            page="chatPage"
          />

          <ImageBackground
            source={backgroundImage}
            style={{ width: '100%', flex: 1 }}
          >
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={{
                _id: this.state.userId,
                avatar: this.state.image,
                name: this.props.user.name
              }}
            />
          </ImageBackground>
        </Drawer>
      </Container>
    );
  }

  // Helper functions
  _storeMessages = messages => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  portraitBody: {
    flexDirection: 'column'
  },
  landScapeBody: {
    flexDirection: 'row'
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});
const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: history => dispatch(logOut(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
