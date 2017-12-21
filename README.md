# Homewizard (Smartwares) API Proxy - MQTT

A proxy API service for Homewizard (Smartwares) connected plugs to integrate into a service of your liking!
It works by fetching a token from the official API and submitting a request to set state on/off for a specific plug to the Homewizard API.

This project is not officially affiliated with any of the products.

## Installation / Configuration

1. Clone & install npm dependencies
2. Copy/move `.sample.env` file to `.env` and fill in your username and password. You should also change the BROKER variable to point to the address of your own MQTT broker. Adding a port is not required
3. Start the development server with `npm run dev` or the production server with `npm start`

You should then obtain the specific ids for each plug since you will need to use them in the MQTT topic publishing.
These can be found on the Homewizard API but the easiest method will be to check out and spin up [this REST proxy API](https://github.com/thibmaek/homewizard-smartwares-api-proxy-rest) and make a GET request to `/plugs` which will return the ids for your plugs in JSON format.

4. Publish an MQTT topic event to the following topic with message `on|off`:
    ```
    homewizard/switch/id/<homewizard_hub_id>/deviceId/<plug_id>/setState
    ```

A full example using mosquitto:

```console
# Toggle a switch on
mosquitto_pub -h hassio.local -t homewizard/switch/id/ada05ac9-…/deviceId/9a86f0a0-…/setState -m on

# Toggle a switch off
mosquitto_pub -h hassio.local -t homewizard/switch/id/ada05ac9-…/deviceId/9a86f0a0-…/setState -m off
```
