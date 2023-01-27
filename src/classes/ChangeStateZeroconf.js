// const fetch = require('node-fetch');

const WebSocket = require("./WebSocket");
const zeroConfUpdatePayload = require("../payloads/zeroConfUpdatePayload");
const { _get } = require("../helpers/utilities");

const fetch = require("node-fetch");

class ChangeStateZeroconf extends WebSocket {
  static async set({ url, device, params, switches, state }) {
    const selfApikey = device.apikey;
    const deviceId = device.deviceid;
    const deviceKey = device.devicekey;

    const endpoint = switches ? "switches" : "switch";

    const body = zeroConfUpdatePayload(selfApikey, deviceId, deviceKey, params);

    const request = await fetch(`${url}/${endpoint}`, {
      method: "post",
      headers: {
        referer: "https://us-api.coolkit.cc:8080",
        origin: "https://us-api.coolkit.cc:8080"
      },
      body: JSON.stringify(body)
    });

    const response = await request.json();

    const error = _get(response, "error", false);

    if (error === 403) {
      return { error, msg: response.reason };
    }

    return { status: "ok", state };
  }
}

module.exports = ChangeStateZeroconf;
