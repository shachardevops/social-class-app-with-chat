import React from 'react';
import { View, Text, Platform, StyleSheet, StatusBar } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Picker,
  Spinner
} from 'native-base';
import Header from './Header';
import ImagePicker from './imagePicker.js';
import validator from 'validator';
import { connect } from 'react-redux';
import CustomButton from './Button';
import { register } from '../store/actions/users';
import { getClassRooms } from '../store/actions/class';
import { CheckBox } from 'react-native-elements';
import CustomItem from './Item';
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.onReset();
    this.props.getClassRooms();
  }
  onClassChange = classRoom => {
    this.setState({
      classRoom: {
        value: classRoom,
        touched: true
      }
    });
  };
  onReset = () => {
    this.setState({
      email: {
        value: 's@gmail.com',
        touched: false
      },
      name: {
        value: '123321123',
        touched: false
      },
      id: {
        value: '123123321123',
        touched: false
      },
      password: {
        value: '123123',
        touched: false
      },
      confirmPassword: {
        value: '123123',
        touched: false
      },
      classRoom: {
        value: '',
        touched: false
      },
      Image: '',
      teacher: null
    });
  };
  handlePassword = (field, password) => {
    if (!password || password.match(/[S+,0-9,a-zA-Z]{1,}?$/)) {
      this.setState({
        [field]: {
          value: password,
          touched: true
        }
      });
    }
  };
  handleNameChange = name => {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    });
  };
  handleEmailChange = email => {
    this.setState({
      email: {
        value: email,
        touched: true
      }
    });
  };
  onIdChange = id => {
    if (!id || id.match(/[1-9]{1,}?$/)) {
      this.setState({
        id: {
          value: id,
          touched: true
        }
      });
    }
  };
  imagePickedHandler = image => {
    this.setState({
      image
    });
  };
  RegisterHandler = () => {
    const userData = {
      email: this.state.email.value,
      password: this.state.password.value,
      name: this.state.name.value,
      id: this.state.id.value,
      classRoom: this.state.classRoom.value,
      teacher: this.state.teacher,
      image: this.state.image
    };
    this.props.onRegister(userData, this.props.history);
    this.onReset();
  };

  render() {
    const {
      password,
      confirmPassword,
      email,
      teacher,
      id,
      name,
      classRoom,
      image
    } = this.state;
    const validEmail = validator.isEmail(email.value);
    const validPassword = password.value.length >= 6;
    const validConfirmPassword =
      confirmPassword.value.length >= 6 &&
      confirmPassword.value === password.value;
    const validId = id.value.length >= 9;
    const validName = name.value.length >= 3;
    const validClass = classRoom.value.length >= 3;
    const validSubmit =
      validEmail &&
      validPassword &&
      validConfirmPassword &&
      validId &&
      validClass &&
      image &&
      validName;

    let teacherOrStudent = teacher ? (
      <Item
        floatingLabel
        error={!validName && name.touched ? true : false}
        success={validName && name.touched ? true : false}
      >
        <Label>Class room</Label>
        <Input onChangeText={this.onClassChange} value={classRoom.value} />
        {!validClass && classRoom.touched ? (
          <Icon name="close-circle" />
        ) : (
          <Icon />
        )}
        {validClass && classRoom.touched ? (
          <Icon name="checkmark-circle" />
        ) : (
          <Icon />
        )}
      </Item>
    ) : (
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        placeholder="Select your Class"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={classRoom.value}
        onValueChange={this.onClassChange}
      >
        {this.props.classRoom.map(classRoom => (
          <Picker.Item key={classRoom} label={classRoom} value={classRoom} />
        ))}
      </Picker>
    );
    return (
      <View
        behavior="padding"
        style={{
          flex: 1
        }}
      >
        <Container>
          <Header
            drawer=""
            path=""
            viewMode={this.state.viewMode}
            history={this.props.history}
            header="register"
            page="registerPage"
          />

          <Content>
            <Form>
              <CustomItem
                valid={validEmail}
                touched={email.touched}
                label="Email"
                onChangeText={this.handleEmailChange}
                keyboardType="email-address"
                value={email.value}
              />
              <CustomItem
                valid={validName}
                touched={name.touched}
                label="Name"
                onChangeText={this.handleNameChange}
                keyboardType="default"
                value={name.value}
              />
              <CustomItem
                valid={validId}
                touched={id.touched}
                label="ID"
                onChangeText={this.onIdChange}
                keyboardType="number-pad"
                value={id.value}
              />
              <CustomItem
                valid={validPassword}
                touched={password.touched}
                label="Password"
                secureTextEntry={true}
                onChangeText={text => this.handlePassword('password', text)}
                keyboardType="number-pad"
                value={password.value}
              />
              <CustomItem
                valid={validConfirmPassword}
                touched={confirmPassword.touched}
                label="Confirm Password"
                secureTextEntry={true}
                onChangeText={text =>
                  this.handlePassword('confirmPassword', text)
                }
                keyboardType="number-pad"
                value={confirmPassword.value}
              />

              <Item style={{ margin: 10 }}>
                <ImagePicker
                  onImagePicked={this.imagePickedHandler}
                  ref={ref => (this.imagePicker = ref)}
                />
                <CheckBox
                  checked={teacher}
                  title="Teacher"
                  onPress={() =>
                    this.setState(state => ({
                      teacher: !state.teacher,
                      classRoom: {
                        value: '',
                        touched: state.classRoom.touched
                      }
                    }))
                  }
                />
                {teacherOrStudent}
              </Item>
              {this.props.isLoading ? (
                <Spinner color="blue" />
              ) : (
                <CustomButton
                  onPress={this.RegisterHandler}
                  valid={validSubmit}
                  iconName="edit"
                  name="Register"
                />
              )}
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    classRoom: state.classRooms.classRooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (userData, history) => dispatch(register(userData, history)),
    getClassRooms: () => dispatch(getClassRooms())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
