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
            isDeleted: false,
            cards: [1, 2, 3],
          },
          2: {
            id: 2,
            title: 'Teste Trash',
            createdDate: 1544742707,
            backgroundColor: '#ecff62',
            isDeleted: true,
            cards: [4, 5, 6],
          },
        },
      };
    }
  }
};

export default sets;
