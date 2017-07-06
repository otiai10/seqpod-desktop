const initialState = {
  target: {
    files: [],
    dir: null,
  }
};

export default (state = Object.assign({}, initialState), action) => {
  switch (action.type) {
  case 'ADD_FASTQ_FILE':
    // Unique by name
    if (state.target.files.some(f => action.data.name == f.name)) return state;
    state.target.files.push(action.data);
    return {...state, target: {...state.target}};
  case 'CANCEL_FASTQ_FILE':
    state.target.files = state.target.files.filter(f => action.data.name != f.name);
    return {...state, target: {...state.target}};
  }
  return state;
};
