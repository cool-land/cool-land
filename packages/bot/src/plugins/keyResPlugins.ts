import { Wechaty, log } from "wechaty";

export const keyResPlugins = (options = {}) => {
  return (wechaty: Wechaty) => {
    wechaty.on("message", async (msg) => {
      log.info(msg.age() + "");

      log.info("StarterBot" + wechaty.name(), msg.toString());

      if (msg.text() === "ding" && msg.age() < 300) {
        await msg.say("dong");
      }
    });
  };
};
