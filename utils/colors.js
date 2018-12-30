const hexToRgb = (hex) => {
  const hexNumber = hex.replace('#', '');
  const r = parseInt(hexNumber.substring(0, 2), 16);
  const g = parseInt(hexNumber.substring(2, 4), 16);
  const b = parseInt(hexNumber.substring(4, 6), 16);

  const result = `rgb(${r},${g},${b})`;
  return result;
};

const $black = '#191919';
const $lightBlack = '#2f2f2f';
const $fullWhite = '#fff';
const $white = '#f6f6f6';
const $grey = '#d7d7d7';
const $lightGrey = '#e5e5e5';
const $lightRed = '#ff2800';
const $darkRed = '#330902';
const $green = '#51CE51';
const $darkGreen = '#337f33';
const $darkBlue = '#0e1a40';
const $lightBlue = '#0073CA';
const $ligtherBlue = '#515582';
const $yellow = '#d3a625';

const newSetPaletteColor = [
  '#0392cf',
  '#1957f5',
  '#df7696',
  '#ff6d70',
  '#f34a53',
  '#f39119',
  '#7bc043',
  '#32994c',
  '#a086d5',
  '#c287e5',
  '#985b41',
];

export {
  hexToRgb,
  newSetPaletteColor,
  $black,
  $lightBlack,
  $fullWhite,
  $white,
  $grey,
  $lightGrey,
  $lightRed,
  $darkRed,
  $green,
  $darkGreen,
  $darkBlue,
  $lightBlue,
  $ligtherBlue,
  $yellow,
};
