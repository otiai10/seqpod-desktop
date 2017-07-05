const initialState = {
  target: {
    files: [],
    dir: null,
  }
};

export default (state = Object.assign({}, initialState), action) => {
  switch (action.type) {
  case 'FILE_SET':
    state.target.files.push(action.data);
    return {...state};
  }
  return state;
};
