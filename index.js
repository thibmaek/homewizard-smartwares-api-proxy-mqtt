const mqtt = require(`mqtt`);
const got = require(`got`);
require(`dotenv`).config();

const getToken = require(`./routes/token`);
const toTitleCase = require(`./lib/toTitleCase`);

const client = mqtt.connect(`mqtt://${process.env.BROKER}`);

/**
 * Connect to the MQTT Broker endpoint
 * @type {EventListener}
 */
client.on(`connect`, () => {
  console.log(`Connected to MQTT broker: ${process.env.BROKER}`);
  client.subscribe(`homewizard/switch/id/+/deviceId/+/setState`);
});

/**
 * Listen to the corresponding topic
 * @type {EventListener}
 */
client.on(`message`, async (topic, message) => {
  const action = toTitleCase(message.toString());

  const uuidRgx = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/ig;
  const [ id, deviceId ] = topic.match(uuidRgx);

  const {token} = await getToken();

  const apiURL = `${process.env.API_URL}/${id}/devices/${deviceId}/action`;
  const {body: res} = await got(apiURL, {
    headers: {
      'x-session-token': token,
    },
    json: true,
    body: {action},
  });

  console.log(`Request details`, {
    req: {
      topic, action, id, deviceId,
      apiURL, token, body: {action}
    },
    res,
  });
});
