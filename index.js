var rpc = require("discord-rpc");
const readline = require("readline");
const client = new rpc.Client({ transport: "ipc" });
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const now = new Date();
const time = now.getTime();
let timestamps = null;

const raw = fs.readFileSync("config/config.json");
const rawSize = JSON.parse(raw);
const size = rawSize.size;
const sizeM = rawSize.sizeM;
const condistion = rawSize.restart;
const state = rawSize.state;
const details = rawSize.details;
const large_image = rawSize.large_image;
const large_text = rawSize.large_text;
const small_image = rawSize.small_image;
const small_text = rawSize.small_text;
const label = rawSize.label;
const url = rawSize.url;
const client_id = rawSize.client_id;

if (condistion == "y") {
  let data = {
    waktu: time,
  };
  fs.writeFileSync("./time.json", JSON.stringify(data));
  timestamps = now.getTime();
  console.log(timestamps);
} else if (condistion == "n") {
  let rawdata = fs.readFileSync("./time.json");
  let data = JSON.parse(rawdata);
  timestamps = data.waktu;
  console.log(data.waktu);
}
client.on("ready", () => {
  client.request("SET_ACTIVITY", {
    pid: process.pid,
    activity: {
      state: state,
      details: details,
      timestamps: {
        start: timestamps,
      },
      assets: {
        large_image: large_image,
        large_text: large_text,
        small_image: small_image,
        small_text: small_text,
      },
      buttons: [
        {
          label: label,
          url: url,
        },
      ],
      party: {
        size: [size, sizeM],
      },
    },
  });
});
client.login({ clientId: client_id }).catch(console.error);
