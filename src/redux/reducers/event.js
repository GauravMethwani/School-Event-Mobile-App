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
} from '../types';

const initialState = {
  events: [],
  loading: false,
  error: null,
  success: false,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENT_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_EVENT_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case GET_ALL_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_EVENT_DETAIL_REQUEST:
    case GET_EVENT_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_EVENT_DETAIL_SUCCESS:
      return { ...state, loading: false, eventDetails: action.payload };
    case CREATE_EVENT_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, success: true };
    case CREATE_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: {
          ...state.events,
          data: state.events.data.filter(event => event.id !== action.payload),
        },
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
       case UPDATE_EVENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: {
          ...state.events,
          data: state.events.data.map(e =>
            e.id === action.payload.id ? action.payload : e
          ),
        },
      };
    case UPDATE_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
}
