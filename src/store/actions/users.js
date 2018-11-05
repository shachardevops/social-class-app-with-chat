import { uiStartLoading, uiStopLoading } from './UI';
import { AsyncStorage } from 'react-native';
import { SET_TOKEN, REMOVE_TOKEN, SET_USER } from './actionTypes';
const getUserFromApi = async token => {
  try {
    let url = 'http://localhost:3000/users/me'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token
      }
    });
    const parseRes = await response.json();

    return parseRes;
  } catch (error) {
    return error;
  }
};

export const register = (userData, history) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const imageUploadResponse = await fetch(
        'https://211trl5rz9.execute-api.eu-west-1.amazonaws.com/prod/image-to-s3',
        {
          method: 'POST',
          body: JSON.stringify({
            image: userData.image.base64,
            username: userData.name,
            id: userData.id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const parsedResponseImageUpload = await imageUploadResponse.json();
      const imageUrl = parsedResponseImageUpload.body.Location;
      userData.image = imageUrl;
      let url = 'http://localhost:3000/register'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
      const responseFromRegister = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          password: userData.password,
          id: userData.id,
          className: userData.classRoom,
          teacher: userData.teacher,
          image: userData.image
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedRes = await responseFromRegister.json();
      userData.classRoom = parsedRes.classRoom;
      dispatch(uiStopLoading());
      const token = responseFromRegister.headers.map['x-auth'];
      if (!token) {
        alert(responseFromRegister._bodyText);
        return null;
      } else {
        await dispatch(storeUserData(token, userData));
        if (userData.teacher) {
          history.push('/teacherPage');
        } else {
          history.push('/studentPage');
        }

        return { token, userData };
      }
    } catch (error) {
      dispatch(uiStopLoading());
      console.log('error', error);
    }
  };
};
export const AutoSignIn = history => {
  return async dispatch => {
    try {
      const token = await dispatch(getToken());
      if (token) {
        const user = await getUserFromApi(token);
        await dispatch(storeUserData(token, user.person));
        if (user.person.teacher) {
          history.push('/teacherPage');
        } else {
          history.push('/studentPage');
        }
      }
    } catch (err) {
      console.log('Failed to fetch token!');
    }
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      let url = 'http://localhost:3000/users/login'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
      const responseFromLogin = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(uiStopLoading());

      const token = responseFromLogin.headers.map['x-auth'];
      if (!token) {
        alert('Wrong email or password');
        return null;
      } else {
        const userData = await getUserFromApi(token);
        await dispatch(storeUserData(token, userData.person));
        if (userData.person.teacher) {
          history.push('/teacherPage');
        } else {
          history.push('/studentPage');
        }

        return { token, userData };
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert(err);
    }
  };
};
export const getToken = () => {
  return async (dispatch, getState) => {
    try {
      let token = getState().users.token;
      if (token) {
        dispatch(setToken(token));
        return token;
      }
      token = await AsyncStorage.getItem('my:token');
      if (!token) {
        return;
      }
      dispatch(setToken(token));
      return token;
    } catch (error) {
      console.log(error);
    }
  };
};

export const storeUserData = (token, user) => {
  return dispatch => {
    dispatch(setToken(token));
    dispatch(setUser(user));

    AsyncStorage.setItem('my:token', token);
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    token
  };
};
export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};
export const logOut = history => {
  return dispatch => {
    AsyncStorage.removeItem('my:token');
    dispatch(RemoveToken());
    console.log(history);
    history.push('/');
  };
};
export const RemoveToken = () => {
  return {
    type: REMOVE_TOKEN
  };
};
