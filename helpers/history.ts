import * as Octokit from '@octokit/rest';
import { formatCommits } from './parsers';
import { getCommits } from './commits';
import { exit } from './utils';
import { FormattedCommit } from '../interfaces/formattedCommit';


const getBranchName = async ({
  octokit,
  owner,
  repo,
  sha,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  sha: string;
}): Promise<string> => {
  // FIXME: this _will_ not be appropriate in the future, but will work for now
  // get all the open prs
  try {
    const pullRequests = await octokit.pulls
      .list({
        owner,
        repo,
        state: 'open',
      })
      .catch((error) => exit('pullRequests', error.message));

    if (!pullRequests || !pullRequests.data) {
      throw new Error('could not find pull request');
    }

    const branchName = ((): string => {
      for (let i = 0; i < pullRequests.data.length; i += 1) {
        if (sha === pullRequests.data[i].merge_commit_sha) {
          return pullRequests.data[i].head.ref;
        }
      }

      throw new Error('Unable to find branch name');
    })();

    return branchName;
  } catch (error) {
    exit('getBranchName', error);
    return null;
  }
};

const getCodeHistory = async ({
  octokit,
  owner,
  repo,
  branch: envBranch,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  branch: string;
}): Promise<Array<FormattedCommit>> => {
  try {
    const branch = await octokit.repos
      .getBranch({
        owner,
        repo,
        branch: envBranch,
      })
      .catch((error) => exit('getBranch', error.message));

    if (!branch || !branch.data.name) {
      throw new Error('could not find branch');
    }

    // get detailed commits
    const commits = await getCommits({
      octokit,
      owner,
      repo,
      sha: branch.data.name,
    }).catch((error) => exit('getCommits', error.message));

    if (!Array.isArray(commits)) {
      throw new Error('could not find commits');
    }

    // return the cleaned up commit data!
    return commits.map(formatCommits);
  } catch (error) {
    exit('getCodeHistory', error);
    return null;
  }
};

export { getCodeHistory, getBranchName };
