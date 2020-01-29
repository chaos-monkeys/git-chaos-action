import { getCodeHistory, getBranchName } from './helpers/history';
import { createComment } from './helpers/comment';
import { uploadHistory } from './helpers/aws';
import { getCollaborators } from './helpers/collaborators';
import { getCurrentTimestamp, buildHistoryIndex } from './helpers/utils';
import Octokit = require('@octokit/rest');

require('dotenv').config();

// these envs come from the github action
const {
  GITHUB_TOKEN,
  GITHUB_SHA,
  GITHUB_REPOSITORY,
  GITHUB_REF,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
} = process.env;

const [GIT_OWNER, GIT_REPO] = GITHUB_REPOSITORY.split('/');
const issueNumber = GITHUB_REF.split('/')[2];

(async () => {
  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  const history = await getCodeHistory({
    octokit,
    owner: GIT_OWNER,
    repo: GIT_REPO,
    branch: await getBranchName({
      octokit,
      owner: GIT_OWNER,
      repo: GIT_REPO,
      sha: GITHUB_SHA,
    }),
  });

  const responseBuilder = {
    meta: {
      repo_name: GIT_REPO,
      repo_owner: GIT_OWNER,
      start_time: getCurrentTimestamp(),
      commit_sha: GITHUB_SHA,
    },
    collaborators: await getCollaborators({
      octokit,
      owner: GIT_OWNER,
      repo: GIT_REPO,
    }),
    historyIndex: buildHistoryIndex(history),
    history,
  };

  const path = await uploadHistory({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    body: responseBuilder,
    sha: GITHUB_SHA,
  });

  await createComment({
    octokit,
    owner: GIT_OWNER,
    repo: GIT_REPO,
    issue_number: issueNumber,
    // TODO: update with something less 'temporary'
    message: `Git history uploaded to ${path}`,
  });

  return true;
})();
