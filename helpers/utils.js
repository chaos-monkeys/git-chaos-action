const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const buildHistoryIndex = (history) => history.reduce((historyIndex, val, idx) => {
  // FIXME: eslint error
  // eslint-disable-next-line no-param-reassign
  historyIndex[val.sha] = idx;
  return historyIndex;
}, {});

module.exports = {
  getCurrentTimestamp,
  buildHistoryIndex,
};
