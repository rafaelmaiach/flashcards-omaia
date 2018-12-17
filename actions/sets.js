const CREATE_SET = 'CREATE_SET';
const DELETE_SET = 'DELETE_SET';
const MOVE_TO_TRASH = 'MOVE_TO_TRASH';

const createSet = newSet => ({
  type: CREATE_SET,
  payload: newSet,
});

const deleteSet = (id, type) => ({
  type: type === 'delete' ? DELETE_SET : MOVE_TO_TRASH,
  payload: id,
});

export {
  CREATE_SET,
  DELETE_SET,
  MOVE_TO_TRASH,
  createSet,
  deleteSet,
};
