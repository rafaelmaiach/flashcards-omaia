const CREATE_CARDS = 'CREATE_CARDS';

const createCards = cards => ({
  type: CREATE_CARDS,
  payload: cards,
});

export {
  CREATE_CARDS,
  createCards,
};
