//import { ADD_ARRIVAL } from ;
import { uiStartLoading, uiStopLoading } from './UI';
import { ARRIVED, SET_ARRIVALS } from './actionTypes';
export const arrived = () => {
  return {
    type: ARRIVED
  };
};
export const setArrivals = arrivals => {
  return {
    type: SET_ARRIVALS,
    arrivals
  };
};
export const getListOfArrivalsByDateAndClass = (date, token) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());
      let url = 'http://localhost:3000/arrivals/date'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          date
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token
        }
      });
      dispatch(uiStopLoading());
      const parsedRes = await response.json();
      dispatch(setArrivals(parsedRes.arrivals));
    } catch (err) {
      console.log(err);
    }
  };
};
export const CheckIfArrived = (id, token) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());
      let url = 'http://localhost:3000/arrivals/check'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          id
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token
        }
      });
      dispatch(uiStopLoading());

      if (response._bodyText === 'not arrived yet') {
        return;
      } else if (response._bodyText === 'you already arrived') {
        await dispatch(arrived());
        return;
      }
    } catch (err) {
      console.log(err);

      alert(err);
    }
  };
};
export const sendArrival = (id, token) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());

      let url = 'http://localhost:3000/arrivals'; //`http://ec2-18-202-244-203.eu-west-1.compute.amazonaws.com:3000/register`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          id
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token
        }
      });
      dispatch(uiStopLoading());
      alert(response._bodyText);
      await dispatch(arrived());
    } catch (err) {
      alert(err);
    }
  };
};
