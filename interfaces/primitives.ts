import * as oct from '@octokit/rest';

export interface Octokit {
  octokit: oct;
}

export interface Owner {
  owner: string;
}

export interface Repo {
  repo: string;
}

export interface Branch {
  branch: string;
}

export interface Sha {
  sha: string;
}

export interface Message {
  message: string;
}

export interface IssueNumber {
  issue_number: string;
}

export interface AccessKeyId {
  accessKeyId: string;
}

export interface SecretAccessKey {
  secretAccessKey: string;
}
