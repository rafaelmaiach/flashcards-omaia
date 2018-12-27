import { $ligtherBlue } from '../utils/colors';

const SET_BG_COLOR = 'SET_BG_COLOR';

const setStatusBarColor = color => ({
  type: SET_BG_COLOR,
  payload: color,
});

const resetStatusBarColor = () => setStatusBarColor($ligtherBlue);

export {
  SET_BG_COLOR,
  setStatusBarColor,
  resetStatusBarColor,
};
