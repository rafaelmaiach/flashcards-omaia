import {
  CREATE_CARDS,
  DELETE_CARDS,
} from '../actions/cards';

const cards = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CARDS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_CARDS: {
      const cardsId = action.payload;
      const stateCopy = { ...state };

      cardsId.forEach((id) => {
        if (stateCopy[id]) {
          delete stateCopy[id];
        }
      });

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export default cards;
