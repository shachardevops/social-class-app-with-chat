import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Spinner,
  Drawer
} from 'native-base';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import { connect } from 'react-redux';
import { logOut } from '../store/actions/users';
import { getListOfArrivalsByDateAndClass } from '../store/actions/arrivals';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SideBar from './ManuBar';
class TeacherPage extends Component {
  state = {
    Arrived: false,
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    message: '',
    isDateTimePickerVisible: false,
    chosenDate: moment().format('YYYY-MM-DD')
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }
  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true
    });
  componentDidMount = () => {
    this.props.onPickDate(this.state.chosenDate, this.props.token);
  };
  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false
    });
  _handleDatePicked = date => {
    const chosenDate = moment(date).format('YYYY-MM-DD');
    this.setState({ chosenDate });
    this.props.onPickDate(chosenDate, this.props.token);
    this._hideDateTimePicker();
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  setDate(chosenDate) {
    this.setState({ chosenDate });
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };
  isArrived = () => {
    this.setState({ Arrived: true });
  };
  render() {
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
            />
          }
          onClose={() => this.drawer._root.close()}
        >
          <Header
            drawer={this.drawer}
            path="chatPage"
            viewMode={this.state.viewMode}
            history={this.props.history}
            header={'Teacher'}
            headerIcon={'graduation-cap'}
            page={'teacherPage'}
          />

          <Content>
            <View
              style={{
                flex: 1
              }}
            >
              <TouchableOpacity
                onPress={this._showDateTimePicker}
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text>{moment(this.state.chosenDate).format('MMM Do YY')}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
            {this.props.isLoading ? (
              <Spinner color="blue" />
            ) : (
              <List>
                {this.props.arrivals.map(arrival => (
                  <ListItem avatar key={`${arrival.name},${arrival.at}`}>
                    <Left>
                      <Thumbnail source={{ url: arrival.image }} />
                    </Left>
                    <Body>
                      <Text>{arrival.name}</Text>
                      <Text note> Arrived to the class </Text>
                      <Text> </Text>
                    </Body>
                    <Right>
                      <Text note>{arrival.at}</Text>
                    </Right>
                  </ListItem>
                ))}
              </List>
            )}
          </Content>
        </Drawer>
      </Container>
    );
  }
}

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
)(TeacherPage);
