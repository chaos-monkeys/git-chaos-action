import * as Octokit from '@octokit/rest';
import { exit } from './utils';
import { Collaborator } from '../interfaces/collaborators';

const getCollaborators = async ({
  octokit,
  owner,
  repo,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
}): Promise<Array<Collaborator>> => {
  const projectCollaborators = await octokit
    .paginate('GET /repos/:owner/:repo/collaborators', { owner, repo })
    .catch((error) => exit('getCollaborators', error.message));

  if (!Array.isArray(projectCollaborators)) {
    exit('getCollaborators', 'Could not find collaborators');
    return null;
  }

  return projectCollaborators.reduce((collaborators, collaborator) => {
    const {
      username,
      avatar_url: avatarUrl,
      html_url: htmlUrl,
    } = collaborator;

    const clone = { ...collaborators };

    clone[collaborator.id] = {
      username,
      avatar_url: avatarUrl,
      html_url: htmlUrl,
    };

    return clone;
  }, {});
};

export { getCollaborators };
