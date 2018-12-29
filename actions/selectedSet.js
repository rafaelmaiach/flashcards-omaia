const SET_SELECTED_SET = 'SET_SELECTED_SET';

const setSelectedSet = set => ({
  type: SET_SELECTED_SET,
  payload: set,
});

export {
  SET_SELECTED_SET,
  setSelectedSet,
};
