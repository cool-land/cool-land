import { WechatyBuilder, log } from "wechaty";
import { QRCodeTerminal } from "wechaty-plugin-contrib";
import { keyResPlugins } from "./plugins/keyResPlugins";
import { WechatyInterface } from "wechaty/impls";
import { processPlugin } from "./plugins/processPlugin";
import { createWechatyPlugin } from "@cool-land/wechaty_plugin";

const config = {
  small: true, // default: false - the size of the printed QR Code in terminal
};

export interface IBotOptions {
  name: string;
}
let bot: WechatyInterface;

export function runBot(options: IBotOptions) {
  const { name } = options;
  bot = WechatyBuilder.build({
    name,
    puppet: "wechaty-puppet-wechat",
    puppetOptions: {
      uos: true,
    },
  });

  bot.use(QRCodeTerminal(config));

  bot.use(keyResPlugins());

  // 用于进程间交互
  bot.use(processPlugin());

  bot.use(createWechatyPlugin());

  return bot
    .start()
    .then(() => {
      console.log("bot start");
    })
    .catch((e) => log.error("StarterBot", e));
}

process.on("message", (message: any) => {
  console.log("message", message);

  const { type } = message;
  switch (type) {
    case "create":
      runBot({
        name: message.payload.name,
      })
        .then(() => {
          process.send?.({
            type: "create",
            status: "success",
            payload: null,
            pid: process.pid,
          });
        })
        .catch((err) => {
          process.send?.({
            type: "create",
            status: "error",
            pid: process.pid,
            payload: err?.message,
          });
        });
      break;
    case "stop":
      bot
        .stop()
        .then(() => {
          process.send?.({
            type: "stop",
            pid: process.pid,
            status: "success",
          });
        })
        .catch((err) => {
          process.send?.({
            type: "stop",
            pid: process.pid,
            status: "error",
            payload: err?.message,
          });
        });
      break;
    case "start":
      bot
        .start()
        .then(() => {
          process.send?.({
            type: "start",
            status: "success",
            pid: process.pid,
          });
        })
        .catch((err) => {
          process.send?.({
            type: "start",
            pid: process.pid,
            status: "error",
            payload: err?.message,
          });
        });
      break;
    default:
      break;
  }
});
