const cards = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_CARDS': {
      return {
        ...state.cards.byId,
      };
    }
    default: {
      return state;
    }
  }
};

export default cards;
