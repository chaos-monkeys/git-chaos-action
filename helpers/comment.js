const core = require('@actions/core');

const createComment = async ({
  octokit,
  owner,
  repo,
  message,
  issue_number,
}) => octokit.issues.createComment({
  owner,
  repo,
  issue_number,
  body: message,
}).catch((err) => {
  core.debug(err);
});

module.exports = {
  createComment,
};
