import { ChildProcess, fork } from "child_process";
import EventEmitter from "events";
import path from "path";
import { IBotMsg } from "./type";
import { ScanStatus } from "wechaty";

export interface IBotManagerOptions {}

export interface IBoter {
  pid: number;
  bot: ChildProcess;
  ststus: "started" | "stopped";
  loginStatus: boolean;
  scanStatus?: ScanStatus;
  qrCode?: string;
  loginer?: any;
  botName: string;
}

export default class BotManager extends EventEmitter {
  botPool = new Map<number, IBoter>();
  options: IBotManagerOptions;

  constructor(options: IBotManagerOptions = {}) {
    super();
    this.options = options;
  }

  createBot() {
    try {
      const child = fork(path.resolve(__dirname, "./bot.js"));
      if (!child || !child.pid) {
        return false;
      }
      const { pid } = child;
      const botName = "island" + pid;
      child.send({
        type: "create",
        payload: {
          name: botName,
        },
      });
      this.botPool.set(pid, {
        pid,
        bot: child,
        ststus: "stopped",
        loginStatus: false,
        botName,
      });
      this.listen(child);
      return {
        pid,
        name: botName,
      };
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  listen(bot: ChildProcess) {
    const { pid } = bot;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const boter = self.botPool.get(pid!);
    console.log(boter);

    if (!boter) return;
    bot.addListener("message", function onMsg(msg: IBotMsg) {
      const { type } = msg;
      switch (type) {
        case "create": {
          const { status } = msg;
          if (status === "success") {
            boter.ststus = "started";
          } else {
            boter.ststus = "stopped";
          }
          break;
        }
        case "scan": {
          const {
            payload,
          }: {
            pid: number;
            payload: {
              qrcode: string;
              status: ScanStatus;
              data?: string;
            };
          } = msg;
          console.log("scan");

          const { status, qrcode } = payload;
          boter.scanStatus = status;
          boter.qrCode = qrcode;
          break;
        }
        case "login": {
          const { payload } = msg;
          boter.loginStatus = true;
          boter.loginer = payload;
          break;
        }
        case "logout": {
          boter.loginStatus = false;
          boter.loginer = null;
        }
      }
    });
  }

  getAllBot() {
    return Array.from(this.botPool.values());
  }

  getBot(pid: number) {
    return this.botPool.get(pid);
  }

  removeBot(pid: number) {
    const bot = this.botPool.get(pid);
    if (!bot) return;
    bot.bot.kill();
    this.botPool.delete(pid);
    return true;
  }

  stopBot(pid: number) {
    return new Promise((resolve, reject) => {
      const boter = this.botPool.get(pid);
      if (!boter || !boter.bot) {
        reject(false);
        return;
      }
      const { bot } = boter;
      bot.send({
        type: "stop",
      });
      bot.on("message", function onMsg(msg: any) {
        if (msg.type === "stop" && msg.status === "success") {
          resolve(msg.pid);
          boter.ststus = "stopped";
        } else {
          reject(false);
        }
        bot.removeListener("message", onMsg);
      });
      boter.ststus = "stopped";
    });
  }

  startBot(pid: number) {
    return new Promise<boolean>((resolve, reject) => {
      const boter = this.botPool.get(pid);
      if (!boter || !boter.bot) {
        reject(false);
        return;
      }
      const { bot } = boter;
      bot.send({
        type: "start",
      });
      bot.on("message", function onMsg(msg: any) {
        if (msg.type === "start" && msg.status === "success") {
          resolve(msg.pid);
          boter.ststus = "started";
        } else {
          reject(false);
        }
        bot.removeListener("message", onMsg);
      });
    });
  }
}
