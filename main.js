const Octokit = require('@octokit/rest');
const { getCodeHistory, getBranchName } = require('./helpers/history');
const { createComment } = require('./helpers/comment');
const { uploadHistory } = require('./helpers/aws');
const { getCollaborators } = require('./helpers/collaborators');
const { getCurrentTimestamp, buildHistoryIndex } = require('./helpers/utils');

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

const run = async () => {
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

  const historyIndex = buildHistoryIndex(history);

  const reponseBuilder = {
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
    historyIndex,
    history,
  };

  const path = await uploadHistory({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    body: reponseBuilder,
    sha: GITHUB_SHA,
  });

  return createComment({
    octokit,
    owner: GIT_OWNER,
    repo: GIT_REPO,
    issue_number: issueNumber,
    // TODO: update with something less 'temporary'
    message: `Git history uploaded to ${path}`,
  });
};

run();
