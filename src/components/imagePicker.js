import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text } from 'native-base';

class PickImage extends Component {
  state = {
    pickedImage: null
  };
  reset = () => {
    this.setState({
      pickedImage: null
    });
  };
  pickImageHandler = () => {
    console.log(ImagePicker);
    ImagePicker.showImagePicker(
      { title: 'Pick an Image', maxWidth: 300, maxHeight: 300 },
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          console.log(res);
          this.setState({
            pickedImage: { uri: res.uri }
          });
          this.props.onImagePicked({ base64: res.data });
        }
      }
    );
  };

  render() {
    return (
      <Button transparent light onPress={this.pickImageHandler}>
        <Icon
          name={Platform.OS === 'android' ? `md-attach` : `ios-attach`}
          size={30}
          style={{ marginTop: 5, paddingRight: 10, paddingLeft: 10 }}
        />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickImage;
