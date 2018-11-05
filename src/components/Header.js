import { Header, Body, Left, Right, Title, Icon } from 'native-base';
import { styles } from '../styles';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
export default ({
  drawer,
  path,
  history,
  viewMode,
  header,
  headerIcon,
  page
}) => {
  const leftIcon =
    page === 'registerPage' || page === 'loginPage' ? (
      <FAIcon
        name="arrow-left"
        style={{ fontSize: 35, color: 'white' }}
        onPress={() => history.goBack()}
      />
    ) : (
      <FAIcon
        name="bars"
        style={{ fontSize: 35, color: 'white' }}
        onPress={() => drawer._root.open()}
      />
    );
  const rightIcon =
    page === 'registerPage' || page === 'loginPage' ? null : page ===
    'chatPage' ? (
      <FAIcon
        name="calendar-check-o"
        style={{ fontSize: 35, color: 'white' }}
        onPress={() => history.push(`/${path}`)}
      />
    ) : (
      <Icon
        name="md-chatboxes"
        style={{ color: 'white' }}
        onPress={() => history.push('/chatPage')}
      />
    );

  return (
    <Header
      style={[
        {
          backgroundColor: '#3a455c',
          height: 90,
          borderBottomColor: '#757575'
        },
        styles.androidHeader
      ]}
    >
      <Left style={{ flexDirection: 'row' }}>{leftIcon}</Left>
      <Body
        style={
          viewMode !== 'portrait' ? styles.portraitBody : styles.landScapeBody
        }
      >
        {headerIcon ? (
          <FAIcon name={headerIcon} style={{ fontSize: 35, color: 'white' }} />
        ) : null}
        <Title
          style={{
            marginLeft: 5,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20
          }}
        >
          {header}
        </Title>
      </Body>
      <Right>{rightIcon}</Right>
    </Header>
  );
};
