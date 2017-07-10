const initialState = {
  loading:  0,
  total:    1000,
  received: 0,
  progress: 0,
};
export default (state = {...initialState}, action) => {
  switch(action.type) {
  case 'API_START':
    return {...state, loading: state.loading + 1};
  case 'API_PROGRESS':
    return {...state, total: action.data.total, received: action.data.received, progress: action.data.received / action.data.total};
  case 'API_COMPLETED':
    return {...state, ...(state.loading == 1) ? {progress: 1} : null};
  case 'API_END':
    return {...state, loading: state.loading - 1};
  }
  return state;
};
