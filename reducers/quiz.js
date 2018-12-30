import {
  CREATE_QUIZ_CARDS,
  UPDATE_CARD_ANSWER,
} from '../actions/quiz';

const quiz = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUIZ_CARDS: {
      const cardsById = action.payload.reduce((acc, curr) => {
        if (!acc[curr.id]) {
          acc[curr.id] = { ...curr, isCorrect: false };
          return acc;
        }

        return acc;
      }, {});

      return { ...cardsById };
    }
    case UPDATE_CARD_ANSWER: {
      const { cardId, answer } = action.payload;

      const stateCopy = {
        ...state,
        [cardId]: {
          ...state[cardId],
        },
      };

      stateCopy[cardId].isCorrect = answer;

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export default quiz;
