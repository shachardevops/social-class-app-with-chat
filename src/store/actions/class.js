import { SET_CLASS_ROOMS } from './actionTypes';
export const setClassRooms = classRooms => {
  return {
    type: SET_CLASS_ROOMS,
    classRooms
  };
};

export const getClassRooms = () => {
  return async dispatch => {
    try {
      //dispatch(uiStartLoading());

      const url = 'http://localhost:3000/classrooms'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/classrooms`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const classRooms = await response.json();
      console.log(classRooms);
      dispatch(setClassRooms(classRooms.classRooms));
    } catch (error) {
      alert(error);
      //dispatch(uiStopLoading());
    }
  };
};
