import {
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_EVENT_DETAIL_REQUEST,
  GET_EVENT_DETAIL_SUCCESS,
  GET_EVENT_DETAIL_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  
} from '../types'

import http from '../../services/api'

export const eventList=(page=1, department, type, search )=> async dispatch =>{
  dispatch({ type: GET_ALL_EVENT_REQUEST });
  try{

  const response = await http.get(`/events`, {
  params: {
    department,
    type,
    search,
    page,
  }
});
console.log('API Response:', response.data);
  dispatch({
        type: GET_ALL_EVENT_SUCCESS,
        payload: response.data,
      });
  }
  catch(error){
    dispatch({
        type:  GET_ALL_EVENT_FAILURE,
        payload: error.message,
      });
  }

}


export const fetchEventById = id => async dispatch => {
  dispatch({ type: GET_EVENT_DETAIL_REQUEST });
  try {
    const res = await http.get(`/events/${id}`);
    dispatch({ type: GET_EVENT_DETAIL_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_EVENT_DETAIL_FAILURE, payload: error.message });
  }
};

export const createEvent = (eventData) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const response = await http.post('/events', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('API Response:', response.data);

    dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    dispatch({ type: CREATE_EVENT_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    const response = await http.delete(`/events/${eventId}`);
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
    return response;
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};


export const updateEvent = (id, eventData) => async dispatch => {
  dispatch({ type: UPDATE_EVENT_REQUEST });

  try {
  const response = await http.post(`/events/${id}?_method=PUT`, eventData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

    dispatch({ type: UPDATE_EVENT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_EVENT_FAILURE, payload: error.message });
    throw error;
  }
};