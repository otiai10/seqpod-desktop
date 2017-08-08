const initialState = {
  requests: {},
};
export default (state = {...initialState}, action) => {
  switch(action.type) {
  case 'API_START':
    return {
      ...state,
      requests: {
        ...state.requests,
        [action.data.id]: {loaded: 0, total: 1000}, // TMP
      },
    };
  case 'API_PROGRESS':
    return {
      ...state,
      requests: {
        ...state.requests,
        [action.data.id]: {loaded: action.data.loaded, total: action.data.total},
      },
    };
  case 'API_COMPLETED':
    return {
      ...state,
      requests: {
        ...state.requests,
        [action.data.id]: {loaded: state.requests[action.data.id].total, total: state.requests[action.data.id].total},
      },
    };
  case 'API_END':
    delete(state.requests[action.data.id]);
    return {
      ...state,
      requests: {...state.requests},
    };
  }
  return state;
};
