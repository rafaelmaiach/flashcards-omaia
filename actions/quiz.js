const CREATE_QUIZ_CARDS = 'CREATE_QUIZ_CARDS';
const UPDATE_CARD_ANSWER = 'UPDATE_CARD_ANSWER';

const createQuizCards = cards => ({
  type: CREATE_QUIZ_CARDS,
  payload: cards,
});

const updateCardAnswer = (cardId, answer) => ({
  type: UPDATE_CARD_ANSWER,
  payload: {
    cardId,
    answer,
  },
});

export {
  CREATE_QUIZ_CARDS,
  UPDATE_CARD_ANSWER,
  createQuizCards,
  updateCardAnswer,
};
