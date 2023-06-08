import { Wechaty } from "wechaty";
import applyOnMessage from "./handler/onMessage";
import applyOnScan from "./handler/onScan";

interface IWechatyPluginOptions {
  ignoreEvents?: (
    | "scan"
    | "login"
    | "logout"
    | "friendship"
    | "room-join"
    | "room-topic"
    | "room-leave"
    | "message"
    | "ready"
    | "heartbeat"
    | "error"
  )[];
}

function createWechatyPlugin(options: IWechatyPluginOptions = {}) {
  console.log("createWechatyPlugin", options);

  const { ignoreEvents = [] } = options;
  return (bot: Wechaty) => {
    console.log("wechat_plugin", bot);
    if (!ignoreEvents.includes("scan")) applyOnScan(bot);
    // if (!ignoreEvents.includes("login")) bot.on("login", onLogin);
    // if (!ignoreEvents.includes("logout")) bot.on("logout", onLogout);
    // if (!ignoreEvents.includes("friendship")) bot.on("friendship", onFriend);
    // if (!ignoreEvents.includes("room-join")) bot.on("room-join", onRoomjoin);
    // if (!ignoreEvents.includes("room-topic")) bot.on("room-topic", onRoomtopic);
    // if (!ignoreEvents.includes("room-leave")) bot.on("room-leave", onRoomleave);
    if (!ignoreEvents.includes("message")) applyOnMessage(bot);
    // if (!ignoreEvents.includes("ready")) bot.on("ready", onReady);
    // if (!ignoreEvents.includes("heartbeat")) bot.on("heartbeat", onHeartbeat);
    // if (!ignoreEvents.includes("error")) bot.on("error", onError);
  };
}

export { createWechatyPlugin };
