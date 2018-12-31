const CREATE_QUIZ_ANSWER = 'CREATE_QUIZ_ANSWER';
const RESET_QUIZ = 'RESET_QUIZ';

const createQuizAnswer = (card, answer) => ({
  type: CREATE_QUIZ_ANSWER,
  payload: {
    card,
    answer,
  },
});

const resetQuiz = () => ({
  type: RESET_QUIZ,
});

export {
  RESET_QUIZ,
  CREATE_QUIZ_ANSWER,
  resetQuiz,
  createQuizAnswer,
};
