const core = require('@actions/core');

const { formatCommits } = require('./parsers');
const { getCommits } = require('./commits');

const getBranchName = async ({
  octokit, owner, repo, sha,
}) => {
  // FIXME: this _will_ not be appropriate in the future, but will work for now
  // get all the open prs
  const { data: pullRequests } = await octokit.pulls
    .list({
      owner,
      repo,
      state: 'open',
    })
    .catch((error) => {
      core.debug('pullRequests');
      core.setFailed(error.message);
    });

  const branchName = (() => {
    for (let i = 0; i < pullRequests.length; i += 1) {
      if (sha === pullRequests[i].merge_commit_sha) {
        core.debug(`head.ref ${pullRequests[i].head.ref}`);
        return pullRequests[i].head.ref;
      }
    }
    return '';
  })();

  return branchName || core.setFailed('Unable to find branch');
};

const getCodeHistory = async ({
  octokit, owner, repo, branch: envBranch,
}) => {
  // get branch
  const { data: branch } = await octokit.repos
    .getBranch({
      owner,
      repo,
      branch: envBranch,
    })
    .catch((error) => {
      core.debug('getBranch');
      core.setFailed(error.message);
    });

  // get detailed commits
  const commits = await getCommits({
    octokit,
    owner,
    repo,
    sha: branch.name,
  }).catch((error) => {
    core.debug('getCommits');
    core.setFailed(error.message);
  });

  // return the cleaned up commit data!
  return commits.map(formatCommits);
};

module.exports = {
  getCodeHistory,
  getBranchName,
};
