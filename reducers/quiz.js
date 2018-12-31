import {
  CREATE_QUIZ_ANSWER,
  RESET_QUIZ,
} from '../actions/quiz';

const initialState = {};

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_ANSWER: {
      const { card, answer } = action.payload;

      return {
        ...state,
        [card.id]: {
          ...card,
          isCorrect: answer,
        },
      };
    }
    case RESET_QUIZ: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default quiz;
