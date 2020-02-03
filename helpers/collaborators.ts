import * as Octokit from '@octokit/rest';
import { exit } from './utils';
import { Collaborators } from '../interfaces/collaborators';

const getCollaborators = async ({
  octokit,
  owner,
  repo,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
}): Promise<Collaborators> => {
  let allCollaborators: Collaborators = {};
  const projectCollaborators = await octokit
    .paginate('GET /repos/:owner/:repo/collaborators', { owner, repo })
    .catch((error) => exit('getCollaborators', error.message));

  if (!Array.isArray(projectCollaborators)) {
    exit('getCollaborators', 'Could not find collaborators');
    return null;
  }

  for (const collaborator of projectCollaborators) {
    const collaboratorInfo = await octokit
      .request(`GET /users/${collaborator.login}`)
      .then(c => c.data)
      .catch(error => {
        exit('collaboratorInfo', error.message);
      });

    allCollaborators[collaboratorInfo.id] = {
      username: collaboratorInfo.login,
      name: collaboratorInfo.name,
      avatar_url: collaboratorInfo.avatar_url,
      html_url: collaboratorInfo.html_url,
      company: collaboratorInfo.company,
      blog: collaboratorInfo.blog,
      location: collaboratorInfo.location,
    };
  }

  return allCollaborators;
};

export { getCollaborators };
