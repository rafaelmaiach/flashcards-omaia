const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_BACKGROUND_COLOR = 'EDIT_BACKGROUND_COLOR';
const CREATE_SET = 'CREATE_SET';
const RESET_NEW_SET = 'RESET_NEW_SET';

const editTitle = title => ({
  type: EDIT_TITLE,
  payload: title,
});

const editBackgroundColor = color => ({
  type: EDIT_BACKGROUND_COLOR,
  payload: color,
});

const createSet = newSet => ({
  type: CREATE_SET,
  payload: newSet,
});

const resetNewSet = () => ({
  type: RESET_NEW_SET,
});

export {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  CREATE_SET,
  RESET_NEW_SET,
  editTitle,
  editBackgroundColor,
  createSet,
  resetNewSet,
};
