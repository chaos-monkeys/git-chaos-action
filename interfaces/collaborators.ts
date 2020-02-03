interface Collaborator {
  username: string;
  name: string;
  avatar_url: string;
  html_url: string;
  company: string;
  blog: string;
  location: string;
}

export interface Collaborators {
  [key: string]: Collaborator;
}
