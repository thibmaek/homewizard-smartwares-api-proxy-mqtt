import got from 'got';
import sha1 from 'sha1';

import config from '../config';

function getBasicAuthHeader(username: string, password: string) {
  const header = [username, sha1(password)].join(':');
  const authString = Buffer.from(header, 'utf8').toString('base64');
  return { authorization: `Basic ${authString}` };
}

export default async function getSessionToken(username: string, pass: string) {
  const authHeader = getBasicAuthHeader(username, pass);

  const res = await got(config.tokenURL, {
    headers: {
      ...authHeader,
      accept: `application/json`,
    },
  });

  const data = JSON.parse(res.body) as TokenResponse;
  return data.session;
}
