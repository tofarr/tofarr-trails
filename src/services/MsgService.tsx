
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
export const msgs: IMsg[] = [];

export function addMsg(msg:string, type:MsgType = MsgType.Info){
  msgs.push({
    type,
    msg,
    timestamp: new Date(),
  });
  _publish();
}

export function clearMsgs(){
  msgs.length = 0;
  _publish();
}

export function subscribeToMsgs(callback: (msg: IMsg[]) => void){
  subscribers.push(callback);
}

export function unsubscribeFromMsgs(callback: (msg: IMsg[]) => void){
  const index = subscribers.indexOf(callback);
  if(index >= 0){
    subscribers.splice(index, 1);
  }else{
    console.error('Attempted to unsubscribe callback which was not subscribed!', callback);
  }
}

function _publish(){
  subscribers.forEach((subscriber) => subscriber(msgs));
}
