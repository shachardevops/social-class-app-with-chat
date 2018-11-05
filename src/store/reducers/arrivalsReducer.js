import { SET_ARRIVALS, ARRIVED } from '../actions/actionTypes';

const initialState = {
  arrivals: [],
  arrived: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARRIVED:
      return {
        ...state,
        arrived: true
      };
    case SET_ARRIVALS: {
      return {
        ...state,
        arrivals: action.arrivals
      };
    }
    default:
      return state;
  }
};

export default reducer;
