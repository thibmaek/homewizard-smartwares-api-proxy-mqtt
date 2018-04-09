require(`dotenv`).config();
const mqtt = require(`mqtt`);
const got = require(`got`);
const consola = require(`consola`);

const isDevelopment = process.env.ENV === 'development';

const getToken = require(`./routes/token`);
const toTitleCase = require(`./lib/toTitleCase`);

const UUID_REGEX = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/ig;

exports.handler = (event, context, callback) => {
  const client = mqtt.connect(`mqtt://${process.env.BROKER}`, {
    username: process.env.BROKER_USER,
    password: process.env.BROKER_PASS,
    port: process.env.BROKER_PORT,
  });

  client.on(`connect`, () => {
    consola.success(`🔌 Connected to MQTT broker: ${process.env.BROKER}`);

    client.subscribe(`homewizard/switch/id/+/deviceId/+/setState`);

    client.on(`message`, async (topic, message) => {
      const action = toTitleCase(message.toString());
      const res = topic.match(UUID_REGEX);
      const id = res[0];
      const deviceId = res[1];

      if ((!res || res.length > 2) || (!id && !deviceId)) {
        consola.error('No id and/or deviceId passed');
      }

      const {token} = await getToken();
      const apiURL = `${process.env.API_URL}/${id}/devices/${deviceId}/action`;

      const {body} = await got(apiURL, {
        headers: {
          'x-session-token': token,
        },
        json: true,
        body: {action},
      });

      if (isDevelopment) {
        console.info(`Request details`, {
          req: {
            topic, action, id, deviceId, apiURL, token, body: {action},
          },
          res: body,
        });
      }

      callback(null);
    });
  });
}
