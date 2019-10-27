
export enum MsgType{
  Info,
  Warning,
  Error,
}

export interface IMsg{
  type: MsgType,
  msg: string;
  timestamp: Date;
}

const subscribers: ((msgs: IMsg[]) => void)[] = [];
let msgs: IMsg[] = [];

function doPublish(){
  subscribers.forEach((subscriber) => subscriber(msgs));
}

export default () => {
  return {
    msgs : msgs,
    addMsg(msg: string, type: MsgType = MsgType.Info) {
      const newMsg = {
        type,
        msg,
        timestamp: new Date(),
      };
      msgs = msgs.slice();
      msgs.push(newMsg);
      doPublish();
    },
    clearMsgs() {
      msgs = [];
      doPublish();
    },
    subscribeToMsgs(callback: (msg: IMsg[]) => void) {
      subscribers.push(callback);
    },
    unsubscribeFromMsgs(callback: (msg: IMsg[]) => void) {
      const index = subscribers.indexOf(callback);
      if(index >= 0){
        subscribers.splice(index, 1);
      }else{
        console.error('Attempted to unsubscribe callback which was not subscribed!', callback);
      }
    }
  };
};
