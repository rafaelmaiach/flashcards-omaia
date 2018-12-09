const sets = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_SETS': {
      return {
        ...state.sets.byId,
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
