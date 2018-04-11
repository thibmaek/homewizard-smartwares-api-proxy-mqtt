# Homewizard (Smartwares) API Proxy - MQTT

A proxy API service for Homewizard (Smartwares) connected plugs to integrate into a service of your liking!
It works by fetching a token from the official API and submitting a request to set state on/off for a specific plug to the Homewizard API.

This project is not officially affiliated with any of the products.

## Installation / Configuration

1. Clone & install npm dependencies
2. Copy/move `sample.env` file to `.env` and fill in your username and password. You should also change the BROKER variable to point to the address of your own MQTT broker. If you want you can enter additional credentials to use a cloud-based MQTT broker.
3. Start the development server with `npm run dev` or the production server with `npm start`

You should then obtain the specific ids for each plug since you will need to use them in the MQTT topic publishing.
These can be found on the Homewizard API but the easiest method will be to check out and spin up [this REST proxy API](https://github.com/thibmaek/homewizard-smartwares-api-proxy-rest) and make a GET request to `/plugs` which will return the ids for your plugs in JSON format.

4. Publish an MQTT topic event to the following topic with message `on|off`:
    ```
    homewizard/switch/id/<homewizard_hub_id>/deviceId/<plug_id>/setState
    ```

A full example using mosquitto:

```console
# Toggle a switch on at localhost broker
mosquitto_pub -h localhost -t homewizard/switch/id/ada05ac9-…/deviceId/9a86f0a0-…/setState -m on

# Toggle a switch off at localhost broker
mosquitto_pub -h localhost -t homewizard/switch/id/ada05ac9-…/deviceId/9a86f0a0-…/setState -m off
```

### Deploying with Serverless
The MQTT proxy is written to be deployed as cloud function, using the Serverless framework.
The config in `serverless.yaml` should be enough to get you up and running using the serverless cli, but you can edit this to your liking (for example link to a db which holds state).

- You can invoke the function locally for testing using `npm run serverless:local`
- The function can be deployed using `npm run serverless:deploy`

### Deploying on embedded devices with resinOS
Running this MQTT proxy off an embedded device is an ideal use case. Therefore, funcitonality to run the proxy in a Docker container has been provided through the resinOS API. If you have a Raspberry Pi laying around, this is an ideal way to have the proxy always running on the local network.

1. Install [resinOS](resinos.io) on your Raspberry Pi (or other supported device)
2. Deploy the application using `npm run resin:deploy`

This will build the container on the device and automatically starting it, streaming all output to your terminal. Once connected to the broker, you'll need to send a SIGINT (ctrl-c) which will produce error output, but the container will keep on running.
