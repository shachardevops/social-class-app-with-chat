import React from 'react';
import { Item, Label, Input, Icon } from 'native-base';
export default ({
  valid,
  touched,
  label,
  onChangeText,
  keyboardType,
  value,
  secureTextEntry
}) => {
  return (
    <Item
      floatingLabel
      error={!valid && touched ? true : false}
      success={valid && touched ? true : false}
    >
      <Label>{label}</Label>
      <Input
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
      />
      {!valid && touched ? <Icon name="close-circle" /> : <Icon />}
      {valid && touched ? <Icon name="checkmark-circle" /> : <Icon />}
    </Item>
  );
};
