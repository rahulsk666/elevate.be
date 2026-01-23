import { jwtPayload } from 'src/types/jwtPayload.types';

export type RequestWithUser = Request & {
  user: jwtPayload;
  accesstoken?: string;
  refreshtoken?: string;
};

export type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  refresh_token: string | null;
  created_at: string;
  updated_at: string;
};

export type GoogleUser = {
  name: string;
  email: string;
  image: string;
};
