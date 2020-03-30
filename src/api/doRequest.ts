import got, { GotJSONOptions } from 'got';

import config from '../config';
import getSessionToken from './getSessionToken';

interface DeviceRequest {
  id: string;
  deviceId: string;
}

export default async function doRequest(
  request: Omit<GotJSONOptions, 'json'>,
  device: DeviceRequest,
) {
  const { HOMEWIZARD_USER, HOMEWIZARD_PASS } = process.env;
  const token = await getSessionToken(HOMEWIZARD_USER, HOMEWIZARD_PASS);

  const API_URL = `${config.apiURL}/${device.id}/devices/${device.deviceId}/action`;

  console.log(`Performing action`, { token, url: API_URL });

  return got(API_URL, {
    headers: {
      'x-session-token': token,
    },
    json: true,
    ...request,
  });
}
