import React from 'react';
import {
  Image,
  View,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';

import { Button, Text } from 'native-base';
import { styles } from '../styles';
import backgroundImage from '../assets/home.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import { AutoSignIn } from '../store/actions/users';
import { connect } from 'react-redux';
class HomePage extends React.Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }
  componentDidMount() {
    this.props.AutoSignIn(this.props.history);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  updateStyles = dims => {
    console.log(dims);
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.imageHome}>
        <View
          style={
            this.state.viewMode === 'portrait'
              ? styles.portraitMain
              : styles.landscapeMain
          }
        >
          <Text
            style={
              this.state.viewMode === 'portrait'
                ? styles.portraitTextHeadingMainPage
                : styles.landscapedTextHeadingMainPage
            }
          >
            Social Class
          </Text>
          <View style={styles.lolpadding} />
          <View style={styles.buttonContainer}>
            <View style={styles.donorButton}>
              <Button
                iconLeft
                block
                style={styles.button}
                onPress={() => this.props.history.push('/register')}
              >
                <Icon
                  name={
                    Platform.OS === 'android'
                      ? 'md-person-add'
                      : 'ios-person-add'
                  }
                  size={30}
                  style={styles.ItemIcon2}
                />
                <Text style={styles.buttonText}>Register</Text>
              </Button>
            </View>

            <View style={styles.userButton}>
              <Button
                iconLeft
                block
                style={styles.button}
                onPress={() => this.props.history.push('/login')}
              >
                <Icon
                  name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                  size={30}
                  style={styles.ItemIcon}
                />
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    AutoSignIn: history => dispatch(AutoSignIn(history))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(HomePage);
