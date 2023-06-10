import { Wechaty } from "wechaty";

const applyOnLogin = (bot: Wechaty) => {
  bot.on("login", (user) => {
    console.log(`login success, user: ${user}`);
  });
};

export default applyOnLogin;
