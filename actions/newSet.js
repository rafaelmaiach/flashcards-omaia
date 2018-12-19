const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_BACKGROUND_COLOR = 'EDIT_BACKGROUND_COLOR';
const RESET_NEW_SET = 'RESET_NEW_SET';
const ADD_CARD_NEW_SET = 'ADD_CARD_NEW_SET';

const editTitle = title => ({
  type: EDIT_TITLE,
  payload: title,
});

const editBackgroundColor = color => ({
  type: EDIT_BACKGROUND_COLOR,
  payload: color,
});

const resetNewSet = () => ({
  type: RESET_NEW_SET,
});

const addCardNewSet = () => ({
  type: ADD_CARD_NEW_SET,
});

export {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
  ADD_CARD_NEW_SET,
  editTitle,
  editBackgroundColor,
  resetNewSet,
  addCardNewSet,
};
