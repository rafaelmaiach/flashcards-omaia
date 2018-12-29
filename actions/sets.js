const CREATE_SET = 'CREATE_SET';
const DELETE_SET = 'DELETE_SET';
const MOVE_TO_TRASH = 'MOVE_TO_TRASH';
const RESTORE_SET = 'RESTORE_SET';
const DELETE_TRASH_SETS = 'DELETE_TRASH_SETS';
const ADD_NEW_CARD_TO_SET = 'ADD_NEW_CARD_TO_SET';

const createSet = newSet => ({
  type: CREATE_SET,
  payload: newSet,
});

const deleteSet = (id, type) => ({
  type: type === 'delete' ? DELETE_SET : MOVE_TO_TRASH,
  payload: id,
});

const restoreSet = id => ({
  type: 'RESTORE_SET',
  payload: id,
});

const deleteTrashSets = ids => ({
  type: DELETE_TRASH_SETS,
  payload: ids,
});

const addNewCardToSet = (setId, cardId) => ({
  type: ADD_NEW_CARD_TO_SET,
  payload: {
    setId,
    cardId,
  },
});

export {
  CREATE_SET,
  DELETE_SET,
  MOVE_TO_TRASH,
  RESTORE_SET,
  DELETE_TRASH_SETS,
  ADD_NEW_CARD_TO_SET,
  createSet,
  deleteSet,
  restoreSet,
  deleteTrashSets,
  addNewCardToSet,
};
