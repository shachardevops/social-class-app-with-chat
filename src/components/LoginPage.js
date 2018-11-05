import React from 'react';
import { View, Text, Platform } from 'react-native';
import validator from 'validator';
import { Container, Content, Form } from 'native-base';
import Header from './Header';
import CustomButton from './Button';
import CustomItem from './Item';
import { login } from '../store/actions/users';
import { connect } from 'react-redux';
class LoginPage extends React.Component {
  state = {
    email: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    }
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
  handleEmailChange = email => {
    this.setState({
      email: {
        value: email,
        touched: true
      }
    });
  };
  LoginHandler = () => {
    const userData = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    this.props.onLogin(userData, this.props.history);
    this.setState({
      password: {
        value: '',
        touched: false
      }
    });
  };

  render() {
    const { password, email } = this.state;
    const validEmail = validator.isEmail(email.value);
    const validPassword = password.value.length >= 6;
    const validSubmit = validEmail && validPassword;
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
            header="Login"
            page="loginPage"
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
                valid={validPassword}
                touched={password.touched}
                label="Password"
                secureTextEntry={true}
                onChangeText={text => this.handlePassword('password', text)}
                keyboardType="number-pad"
                value={password.value}
              />
              <CustomButton
                onPress={this.LoginHandler}
                valid={validSubmit}
                iconName="sign-in"
                name="Login"
              />
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userData, history) => dispatch(login(userData, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
