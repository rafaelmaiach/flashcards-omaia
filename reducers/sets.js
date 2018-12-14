const sets = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_SETS': {
      return {
        ...state.sets.byId,
      };
    }
    default: {
      return {
        allIds: [1],
        byId: {
          1: {
            id: 1,
            title: 'Teste',
            createdDate: 1544742707,
            backgroundColor: '#ec6262',
            cards: [1, 2, 3],
          },
        },
      };
    }
  }
};

export default sets;
