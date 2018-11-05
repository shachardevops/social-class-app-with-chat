import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Text
} from 'native-base';
import { logOut } from '../store/actions/users';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
class MenuBar extends React.Component {
  render() {
    return (
      <Content style={{ backgroundColor: '#$ffffff' }}>
        <Container>
          <Header
            style={[
              { backgroundColor: '#3a455c', height: 90 },
              styles.androidHeader
            ]}
          >
            <Left
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 22,
                  color: 'white',
                  marginLeft: 10
                }}
              >
                Hello {this.props.name}
              </Text>
            </Left>
            <Right>
              <FAIcon
                name="sign-out"
                style={{ fontSize: 35, color: 'white', marginRight: 15 }}
                onPress={() => this.props.onLogOut(this.props.history)}
              />
            </Right>
          </Header>
          {this.props.chatPage ? (
            <Content>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 22,
                  color: 'black',
                  marginLeft: 15
                }}
              >
                Online
              </Text>
              <FlatList
                keyExtractor={item => `${item}${Math.random()}`}
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#f0f0f0',
                  marginLeft: 30
                }}
                data={this.props.onlineUsers}
                renderItem={({ item }) => (
                  <ListItem noBorder key={item}>
                    <Icon
                      name="checkmark-circle"
                      style={{ color: 'green', paddingRight: 10 }}
                    />
                    <Text>{item}</Text>
                  </ListItem>
                )}
              />
            </Content>
          ) : null}
        </Container>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
    isLoading: state.ui.isLoading,
    user: state.users.user,
    token: state.users.token,
    arrivals: state.arrivals.arrivals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: history => dispatch(logOut(history)),
    onPickDate: (date, token) =>
      dispatch(getListOfArrivalsByDateAndClass(date, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
