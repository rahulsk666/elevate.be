export interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
}

export interface GithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}
