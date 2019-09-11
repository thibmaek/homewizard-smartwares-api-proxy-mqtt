/* eslint-disable import/unambiguous, no-console */

const mqtt = require(`mqtt`);
const got = require(`got`);
const consola = require(`consola`);
const { name } = require(`./package.json`);

require(`dotenv`).config();

const isDevelopment = process.env.ENV === `development`;

const getToken = require(`./routes/token`);
const toTitleCase = require(`./lib/toTitleCase`);

const UUID_REGEX = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/ig;

try {
  const client = mqtt.connect(`mqtt://${process.env.BROKER}`, {
    clientId: name,
    password: process.env.BROKER_PASS,
    port: process.env.BROKER_PORT,
    username: process.env.BROKER_USER,
  });

  client.on(`error`, error => {
    console.error(`Error occured during connection:`, error);
  });

  client.on(`connect`, () => {
    consola.success(`🔌 Connected to MQTT broker: ${process.env.BROKER}`);

    client.subscribe(`homewizard/switch/id/+/deviceId/+/setState`);

    client.on(`error`, error => {
      console.error(`Error occured during connection:`, error);
      console.error(`Trying to reconnect...`);
      client.reconnect();
    });

    client.on(`message`, async (topic, message) => {
      const action = toTitleCase(message.toString());
      const res = topic.match(UUID_REGEX);
      const id = res[0];
      const deviceId = res[1];

      if ((!res || res.length > 2) || (!id && !deviceId)) {
        consola.error(`No id and/or deviceId passed`);
      }

      const { token } = await getToken();
      const apiURL = `${process.env.API_URL}/${id}/devices/${deviceId}/action`;

      const { body } = await got(apiURL, {
        body: { action },
        headers: {
          'x-session-token': token,
        },
        json: true,
      });

      if (isDevelopment) {
        console.info(`Request details`, {
          req: { action, apiURL, body: { action }, deviceId, id, token, topic },
          res: body,
        });
      }

    });
  });
} catch (error) {
  console.error(`Global error`, error);
}
