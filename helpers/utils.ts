import { FormattedCommit } from '../interfaces/formattedCommit';
import { HistoryIndex } from '../interfaces/body';

import core = require('@actions/core');


const getCurrentTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const buildHistoryIndex = (history: Array<FormattedCommit>):
HistoryIndex => history.reduce((historyIndex, item, index) => {
  const clone: HistoryIndex = { ...historyIndex };
  clone[item.sha] = index;
  return clone;
}, {});


const exit = (message: string, error?: string): void => {
  core.debug(message);
  core.setFailed(error || message);
  process.exit(1);
};

export { getCurrentTimestamp, buildHistoryIndex, exit };
