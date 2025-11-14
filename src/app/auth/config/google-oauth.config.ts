import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  client_id: process.env.OAUTH_CLIENT_ID,
  client_secret: process.env.OAUTH_CLIENT_SECRET,
  callback_url: process.env.OAUTH_CALLBACK_URL,
}));
