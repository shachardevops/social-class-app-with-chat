import { REGISTER_USER, SET_CLASS_ROOMS } from '../actions/actionTypes';

const initialState = {
  classRooms: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASS_ROOMS:
      return {
        ...state,
        classRooms: action.classRooms
      };
    // case UI_STOP_LOADING:
    //   return {
    //     ...state,
    //     isLoading: false
    //   };

    default:
      return state;
  }
};
export default reducer;
