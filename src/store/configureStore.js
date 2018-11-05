import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import arrivalsReducer from './reducers/arrivalsReducer';
import uiReducer from './reducers/UiReducer';
import usersReducer from './reducers/usersReducer';
import classRoomReducer from './reducers/classRoomReducer';
const rootReducer = combineReducers({
  arrivals: arrivalsReducer,
  users: usersReducer,
  ui: uiReducer,
  classRooms: classRoomReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
