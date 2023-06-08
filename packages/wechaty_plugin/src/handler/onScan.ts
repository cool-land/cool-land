import { Wechaty } from "wechaty";

const applyOnScan = (bot: Wechaty) => {
  console.log("applyOnScan");

  bot.on("scan", (qrcode, status) => {
    console.log(`Scan QR Code to login: ${status}\n${qrcode}`);
  });
};

export default applyOnScan;
