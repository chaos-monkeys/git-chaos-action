import {
  RawCommit, File, Stats, Author2, Committer2,
} from '../interfaces/commit';
import { ParsedFile } from '../interfaces/parser';
import { FormattedCommit } from '../interfaces/formattedCommit';

const parseFiles = (commit: RawCommit): Array<ParsedFile> => commit.files.map((file: File) => ({
  filename: file.filename,
  status: file.status,
  additions: file.additions,
  deletions: file.deletions,
  changes: file.changes,
  raw_url: file.raw_url,
}));

const parseStats = (commit: RawCommit): Stats => commit.stats;

const parseMessage = (commit: RawCommit): string => commit.commit.message;

const parseUrl = (commit: RawCommit): string => commit.commit.url;

const parseAuthor = (commit: RawCommit): Author2 => commit.author;

const parseCommitter = (commit: RawCommit): Committer2 => commit.committer;

const formatCommits = (commit: RawCommit): FormattedCommit => ({
  sha: commit.sha,
  author: parseAuthor(commit),
  committer: parseCommitter(commit),
  files: parseFiles(commit),
  stats: parseStats(commit),
  message: parseMessage(commit),
  url: parseUrl(commit),
});

export { formatCommits };
