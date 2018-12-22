const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_BACKGROUND_COLOR = 'EDIT_BACKGROUND_COLOR';
const RESET_NEW_SET = 'RESET_NEW_SET';
const ADD_CARD_NEW_SET = 'ADD_CARD_NEW_SET';
const EDIT_CARD_BACKGROUND_COLOR = 'EDIT_CARD_BACKGROUND_COLOR';
const EDIT_CARD_FOREGROUND_COLOR = 'EDIT_CARD_FOREGROUND_COLOR';
const EDIT_CARD_BACK_TEXT = 'EDIT_CARD_BACK_TEXT';
const EDIT_CARD_FRONT_TEXT = 'EDIT_CARD_FRONT_TEXT';

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

const editCardBackgroundColor = (id, color) => ({
  type: EDIT_CARD_BACKGROUND_COLOR,
  payload: {
    id,
    color,
  },
});

const editCardForegroundColor = (id, color) => ({
  type: EDIT_CARD_FOREGROUND_COLOR,
  payload: {
    id,
    color,
  },
});

const editCardBackText = (id, text) => ({
  type: EDIT_CARD_BACK_TEXT,
  payload: {
    id,
    text,
  },
});

const editCardFrontText = (id, text) => ({
  type: EDIT_CARD_FRONT_TEXT,
  payload: {
    id,
    text,
  },
});

export {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
  ADD_CARD_NEW_SET,
  EDIT_CARD_BACKGROUND_COLOR,
  EDIT_CARD_FOREGROUND_COLOR,
  EDIT_CARD_BACK_TEXT,
  EDIT_CARD_FRONT_TEXT,
  editTitle,
  editBackgroundColor,
  resetNewSet,
  addCardNewSet,
  editCardBackgroundColor,
  editCardForegroundColor,
  editCardBackText,
  editCardFrontText,
};
