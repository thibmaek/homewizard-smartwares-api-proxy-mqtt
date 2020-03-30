declare interface TokenResponse {
  session: string;
  email: string;
  response: unknown[];
  cloud: boolean;
  version: string;
  status: 'ok' | string;
}

declare enum Actions {
  ToggleOn = 'on',
  ToggleOff = 'off',
}
