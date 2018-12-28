const CREATE_CARDS = 'CREATE_CARDS';
const DELETE_CARDS = 'DELETE_CARDS';

const createCards = cards => ({
  type: CREATE_CARDS,
  payload: cards,
});

const deleteCards = cards => ({
  type: DELETE_CARDS,
  payload: cards,
});

export {
  CREATE_CARDS,
  DELETE_CARDS,
  createCards,
  deleteCards,
};
