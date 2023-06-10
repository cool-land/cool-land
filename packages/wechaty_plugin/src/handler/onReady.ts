import { Wechaty } from "wechaty";

const applyOnReady = (bot: Wechaty) => {
  bot.on("ready", () => {
    console.log("Ready");
  });
};

export default applyOnReady;
