export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Committer {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface File {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  raw_url: string;
}

export interface Stats {
  total: number;
  additions: number;
  deletions: number;
}

export interface FormattedCommit {
  sha: string;
  author: Author;
  committer: Committer;
  files: File[];
  stats: Stats;
  message: string;
  url: string;
}
