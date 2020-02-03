import * as Octokit from '@octokit/rest';
import { exit } from './utils';

const createComment = async ({
  octokit,
  owner,
  repo,
  message,
  issue_number: issueNumber,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  message: string;
  issue_number: string;
// eslint-disable-next-line max-len
}): Promise<void | Octokit.Response<Octokit.IssuesCreateCommentResponse>> => octokit.issues.createComment({
  owner,
  repo,
  issue_number: Number(issueNumber), // https://github.com/probot/probot/issues/917
  body: message,
}).catch((error) => exit('CreateComment', error));

export { createComment };
