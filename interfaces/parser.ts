export interface ParsedFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  raw_url: string;
}
