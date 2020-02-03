import * as Octokit from '@octokit/rest';
import { ParsedFile } from '../interfaces/parser';
import { FormattedCommit } from '../interfaces/formattedCommit';

const parseFiles = (
  commit: Octokit.ReposGetCommitResponse,
): Array<ParsedFile> => commit.files.map((file) => ({
  filename: file.filename,
  status: file.status,
  additions: file.additions,
  deletions: file.deletions,
  changes: file.changes,
  raw_url: file.raw_url,
}));

const parseStats = (
  commit: Octokit.ReposGetCommitResponse,
): Octokit.ReposGetCommitResponseStats => commit.stats;

const parseMessage = (
  commit: Octokit.ReposGetCommitResponse,
): string => commit.commit.message;

const parseUrl = (
  commit: Octokit.ReposGetCommitResponse,
): string => commit.commit.url;

const parseAuthor = (
  commit: Octokit.ReposGetCommitResponse,
): Octokit.ReposGetCommitResponseAuthor => commit.author;

const parseCommitter = (
  commit: Octokit.ReposGetCommitResponse,
): Octokit.ReposGetCommitResponseCommitter => commit.committer;

const formatCommits = (
  commit: Octokit.ReposGetCommitResponse,
): FormattedCommit => ({
  sha: commit.sha,
  author: parseAuthor(commit),
  committer: parseCommitter(commit),
  files: parseFiles(commit),
  stats: parseStats(commit),
  message: parseMessage(commit),
  url: parseUrl(commit),
});

export { formatCommits };
