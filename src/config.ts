export enum MQTTTopics {
  SetState = 'homewizard/switch/id/+/deviceId/+/setState',
}

export default {
  clientName: 'homewizard-smartwares-proxy',
  apiURL: 'https://plug.homewizard.com/plugs',
  tokenURL: 'https://cloud.homewizard.com/account/login',
};
