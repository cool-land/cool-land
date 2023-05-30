export type BotMsgStatusType = "error" | "success";

export type BotMsgType =
  | "create"
  | "start"
  | "stop"
  | "error"
  | "message"
  | "login"
  | "scan"
  | "logout";

export interface IBotMsg {
  type: BotMsgType;
  status: BotMsgStatusType;
  payload: any;
  pid: number;
}
