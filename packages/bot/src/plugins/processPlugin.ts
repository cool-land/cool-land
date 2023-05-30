import { Wechaty } from "wechaty";
import { runBot } from "../bot";

let bot: Wechaty;

export const processPlugin = (options = {}) => {
  return (wechaty: Wechaty) => {
    bot = wechaty;
    wechaty
      .on("scan", (qrcode, status) => {
        process.send?.({
          type: "scan",
          payload: {
            qrcode,
            status,
          },
        });
      })
      .on("login", (user) => {
        process.send?.({
          type: "login",
          payload: user,
        });
      })
      .on("message", (msg) => {
        process.send?.({
          type: "message",
          payload: msg,
        });
      })
      .on("heartbeat", (data) => {
        console.log(data);
      })
      .on("logout", () => {
        process.send?.({
          type: "logout",
        });
      });
  };
};
