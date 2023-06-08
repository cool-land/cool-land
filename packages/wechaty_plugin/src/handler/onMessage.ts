import { Wechaty } from "wechaty";

const applyOnMessage = (bot: Wechaty) => {
  bot.on("message", (msg) => {
    console.log("message", msg);
  });
};

export default applyOnMessage;
