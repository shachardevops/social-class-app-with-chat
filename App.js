import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import LoginPage from './src/components/LoginPage';
import RegisterPage from './src/components/RegisterPage';
import StudentPage from './src/components/StudentPage';
import HomePage from './src/components/HomePage';
import ChatPage from './src/components/ChatPage';
import { View } from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Right,
  Icon,
  Left,
  Header,
  Container,
  Body,
  Title
} from 'native-base';
import { Switch, Router, Route } from 'react-router-native';
import createHistory from 'history/createMemoryHistory';
import TeacherPage from './src/components/TeacherPage';

const history = createHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <View style={{ flex: 1 }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/">
              <Container>
                <Switch>
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/studentPage" component={StudentPage} />
                  <Route exact path="/teacherPage" component={TeacherPage} />
                  <Route exact path="/chatPage" component={ChatPage} />
                  <Route exact path="/login" component={LoginPage} />
                </Switch>
              </Container>
            </Route>
          </Switch>
        </View>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
