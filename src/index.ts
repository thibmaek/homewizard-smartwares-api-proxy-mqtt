/* eslint-disable no-console */
import mqtt from 'mqtt';

require(`dotenv`).config();

import config, { MQTTTopics } from './config';
import * as str from './lib/string';
import performAction from './api/performAction';

const client = mqtt.connect(`mqtt://${process.env.BROKER}`, {
  clientId: config.clientName,
  password: process.env.BROKER_PASS,
  port: Number(process.env.BROKER_PORT),
  username: process.env.BROKER_USER,
});

client.on('connect', () => {
  console.log(`🔌 Connected to MQTT broker: ${process.env.BROKER}`);
});

Object.values(MQTTTopics).forEach(topic => {
  client.subscribe(topic, err => {
    if (err) {
      console.error(`Failed subscribing to: ${topic}`);
    } else {
      console.log(`Subscribed to: ${topic}`);
    }
  });
});

client.on('message', async (topic, msgBuffer) => {
  const message = str.format.titleCase(msgBuffer.toString());
  console.log(`Received new message on topic ${topic}:`, message);

  if (str.isEmptyString(message)) {
    return console.error('Received message was empty');
  }

  const [id, deviceId] = str.getAllUUID(topic);

  if (!id && !deviceId) {
    return console.error(`No id and/or deviceId passed`);
  }

  try {
    console.log(`Triggering new event for ${id}/${deviceId}`);
    const response = await performAction({ id, deviceId }, message as Actions);
    console.log(response.body);
  } catch (error) {
    console.error('Failed performing request...', error);
  }
});

client.on('error', error => {
  console.error('Error occured during connection:', error);
  console.error('Reconnecting');
  client.reconnect();
});
