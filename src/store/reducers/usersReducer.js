import { SET_TOKEN, REMOVE_TOKEN, SET_USER } from '../actions/actionTypes';
const initialState = {
  token: null,
  user: {
    id: '',
    name: '',
    teacher: undefined,
    classRoom: '',
    image: ''
  }
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    case SET_USER:
      return {
        ...state,
        user: {
          id: action.user.id,
          name: action.user.name,
          teacher: action.user.teacher,
          image: action.user.image,
          classRoom: action.user.classRoom
        }
      };
    default:
      return state;
  }
};
export default reducer;
