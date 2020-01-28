const core = require('@actions/core');
const querystring = require('querystring');

const getCommits = async ({
  octokit,
  owner,
  repo,
  sha,
}) => {
  const qs = querystring.stringify({ sha });

  // by using a query string that's the name of a branch - we can get all the commits
  // BUT the commits are missing some data, so we will need to re-get them one-by-one
  const commits = await octokit
    .paginate(`GET /repos/:owner/:repo/commits?${qs}`, { owner, repo })
    .catch((error) => {
      core.debug('getAllCommits');
      core.setFailed(error.message);
    });

  // make the detailed requests one by one
  const detailedCommits = commits.map((commit) => octokit
    .request(`GET /repos/:owner/:repo/commits/${commit.sha}`, { owner, repo })
    .then((c) => c.data)
    .catch((error) => {
      core.debug('detailedCommits');
      core.setFailed(error.message);
    }));

  // make sure all the requests have finished before returning
  return Promise.all(detailedCommits);
};

module.exports = {
  getCommits,
};
