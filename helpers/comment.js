const core = require('@actions/core');

const createComment = async ({
  octokit,
  owner,
  repo,
  message,
  issue_number: issueNumber,
}) => octokit.issues.createComment({
  owner,
  repo,
  issue_number: issueNumber,
  body: message,
}).catch((err) => {
  core.debug(err);
});

module.exports = {
  createComment,
};
