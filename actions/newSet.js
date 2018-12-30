const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_BACKGROUND_COLOR = 'EDIT_BACKGROUND_COLOR';
const RESET_NEW_SET = 'RESET_NEW_SET';
const ADD_CARD_NEW_SET = 'ADD_CARD_NEW_SET';
const REMOVE_CARD_NEW_SET = 'REMOVE_CARD_NEW_SET';
const EDIT_CARD_COLOR = 'EDIT_CARD_COLOR';
const EDIT_CARD_TEXT = 'EDIT_CARD_TEXT';
const SET_EDITION = 'SET_EDITION';

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

const removeCardNewSet = id => ({
  type: REMOVE_CARD_NEW_SET,
  payload: id,
});

const editCardColor = (id, color, colorType) => ({
  type: EDIT_CARD_COLOR,
  payload: {
    id,
    color,
    colorType,
  },
});

const editCardText = (id, text, type) => ({
  type: EDIT_CARD_TEXT,
  payload: {
    id,
    text,
    type,
  },
});

const setEditionInfo = info => ({
  type: SET_EDITION,
  payload: info,
});

export {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
  ADD_CARD_NEW_SET,
  REMOVE_CARD_NEW_SET,
  EDIT_CARD_COLOR,
  EDIT_CARD_TEXT,
  SET_EDITION,
  editTitle,
  editBackgroundColor,
  resetNewSet,
  addCardNewSet,
  removeCardNewSet,
  editCardColor,
  editCardText,
  setEditionInfo,
};
