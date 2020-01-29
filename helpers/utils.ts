const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const buildHistoryIndex = (history) => history.reduce((historyIndex, val, idx) => {
  const clone = { ...historyIndex };
  clone[val.sha] = idx;
  return clone;
}, {});


export { getCurrentTimestamp, buildHistoryIndex };
