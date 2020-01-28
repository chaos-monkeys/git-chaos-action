const core = require('@actions/core');

const getCollaborators = async ({ octokit, owner, repo }) => {
  const projectCollaborators = await octokit
    .paginate('GET /repos/:owner/:repo/collaborators', { owner, repo })
    .catch((error) => {
      core.debug('getCollaborators');
      core.setFailed(error.message);
    });

  return projectCollaborators.reduce((allCollaborators, collaborator) => {
    const { username, avatar_url, html_url } = collaborator;

    const clone = { ...allCollaborators };

    clone[collaborator.id] = {
      username,
      avatar_url,
      html_url,
    };

    return clone;
  }, {});
};

module.exports = {
  getCollaborators,
};
