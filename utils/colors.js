const hexToRgb = (hex) => {
  const hexNumber = hex.replace('#', '');
  const r = parseInt(hexNumber.substring(0, 2), 16);
  const g = parseInt(hexNumber.substring(2, 4), 16);
  const b = parseInt(hexNumber.substring(4, 6), 16);

  const result = `rgb(${r},${g},${b})`;
  return result;
};

const $black = '#191919';
const $white = '#f6f6f6';
const $grey = '#d7d7d7';
const $lightGrey = '#e5e5e5';
const $lightRed = '#ff2800';
const $darkRed = '#330902';
const $lightGreen = '#b4bd8e';
const $darkBlue = '#0e1a40';
const $lightBlue = '#222f5b';
const $yellow = '#d3a625';

export {
  hexToRgb,
  $black,
  $white,
  $grey,
  $lightGrey,
  $lightRed,
  $darkRed,
  $lightGreen,
  $darkBlue,
  $lightBlue,
  $yellow,
};
