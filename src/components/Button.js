import React from 'react';
import { Button, Text } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default props => {
  return (
    <Button
      iconRight
      block
      onPress={props.onPress}
      disabled={!props.valid}
      {...props}
    >
      <Text style={{ fontSize: 20, color: '#FFF' }}>{props.name}</Text>
      <FAIcon
        name={props.iconName}
        size={30}
        style={{
          marginRight: 5,
          color: 'white'
        }}
      />
    </Button>
  );
};
