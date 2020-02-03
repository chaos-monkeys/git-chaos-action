import * as Octokit from '@octokit/rest';
import { exit } from './utils';

import querystring = require('querystring');

const getCommits = async ({
  octokit,
  owner,
  repo,
  sha,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  sha: string;
}): Promise<Array<Octokit.ReposGetCommitResponse>> => {
  const qs = querystring.stringify({ sha });

  // by using a query string that's the name of a branch - we can get all the commits
  // BUT the commits are missing some data, so we will need to re-get them one-by-one
  const commits = await octokit
    .paginate(`GET /repos/:owner/:repo/commits?${qs}`, { owner, repo })
    .catch((error) => exit('getAllCommits', error.message));

  if (!Array.isArray(commits)) {
    exit('getCommits', 'Unable to find commits');
    return null;
  }

  // make the detailed requests one by one
  const detailedCommits = commits.map((commit) => octokit
    .request(`GET /repos/:owner/:repo/commits/${commit.sha}`, { owner, repo })
    .then((c) => c.data)
    .catch((error) => exit('detailedCommits', error.message)));

  // make sure all the requests have finished before returning
  return Promise.all(detailedCommits);
};

export { getCommits };
