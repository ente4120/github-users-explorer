/**
 * GitHub User interface from API response
 */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  repos_url: string;
  type: string;
  site_admin: boolean;
}

/**
 * API Error type
 */
export interface APIError {
  message: string;
  status?: number;
}
