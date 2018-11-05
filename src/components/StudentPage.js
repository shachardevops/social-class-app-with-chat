import React, { Component } from 'react';
import {
  Container,
  Content,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  Button,
  Item,
  Spinner,
  Drawer
} from 'native-base';
import Header from './Header';
import { Dimensions, View, ImageBackground } from 'react-native';

import SideBar from './ManuBar';
import backgroundImage from '../assets/studentPage.jpg';

import { connect } from 'react-redux';
import { logOut } from '../store/actions/users';
import { styles } from '../styles';
import { sendArrival, CheckIfArrived } from '../store/actions/arrivals';
class StudentPage extends Component {
  state = {
    Arrived: false,
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  componentDidMount() {
    const id = this.props.user.id;

    const token = this.props.token;
    this.props.onCheckIfArrived(id, token);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };
  isArrived = () => {
    this.setState({ Arrived: true });
    const token = this.props.token;

    this.props.onArrived(this.props.user.id, token);
  };
  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <SideBar
            navigator={this.navigator}
            name={this.props.user.name}
            history={this.props.history}
          />
        }
        onClose={() => this.drawer._root.close()}
      >
        <Header
          drawer={this.drawer}
          path="chatPage"
          viewMode={this.state.viewMode}
          history={this.props.history}
          header="Student"
          page="studentPage"
          headerIcon="graduation-cap"
        />

        <ImageBackground
          source={backgroundImage}
          style={{ width: '100%', flex: 1 }}
        >
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: '1%'
            }}
          >
            <Text
              style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitTextHeading
                  : styles.landscapedTextHeading
              }
            >
              Welcome
            </Text>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginRight: 25,
                marginTop: '10%'
              }}
            >
              {this.props.isLoading ? (
                <Spinner color="blue" />
              ) : (
                <Button
                  primary
                  rounded
                  onPress={this.isArrived}
                  large
                  disabled={this.state.Arrived || this.props.arrived}
                  style={{ marginLeft: 25 }}
                >
                  <Text> I Arrived </Text>
                </Button>
              )}
            </View>
          </View>
        </ImageBackground>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    user: state.users.user,
    token: state.users.token,
    arrived: state.arrivals.arrived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: history => dispatch(logOut(history)),
    onArrived: (id, token) => dispatch(sendArrival(id, token)),
    onCheckIfArrived: (id, token) => dispatch(CheckIfArrived(id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
