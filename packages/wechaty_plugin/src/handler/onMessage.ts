import { Wechaty } from "wechaty";

/**
 * 监听消息
 */
const applyOnMessage = (bot: Wechaty) => {
  bot.on("message", (msg) => {
    console.log("message", msg);
    // 后端拿回复 axios
    // gpt
    msg.say("hello");
  });
};

export default applyOnMessage;
