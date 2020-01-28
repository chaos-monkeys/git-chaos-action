const parseFiles = (commit) => commit.files.map((file) => ({
  filename: file.filename,
  status: file.status,
  additions: file.additions,
  deletions: file.deletions,
  changes: file.changes,
  raw_url: file.raw_url,
}));

const parseStats = (commit) => commit.stats;

const parseMessage = (commit) => commit.commit.message;

const parseUrl = (commit) => commit.commit.url;

const parseAuthor = (commit) => commit.author;

const parseCommitter = (commit) => commit.committer;

const formatCommits = (commit) => ({
  sha: commit.sha,
  author: parseAuthor(commit),
  committer: parseCommitter(commit),
  files: parseFiles(commit),
  stats: parseStats(commit),
  message: parseMessage(commit),
  url: parseUrl(commit),
});

module.exports = {
  formatCommits,
};
