const timeConverter = (timestamp) => {
  const tempDate = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = tempDate.getFullYear();
  const month = months[tempDate.getMonth()];
  const date = tempDate.getDate();
  const hour = tempDate.getHours();
  const min = tempDate.getMinutes();
  const sec = tempDate.getSeconds();
  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
};

// eslint-disable-next-line import/prefer-default-export
export { timeConverter };
