import { MsgType } from './useMsg';
import useMsg from './useMsg';

function getMsg(err: any): string {
  if(err.msg){
    return getMsg(err.msg);
  }else if(err.message){
    return getMsg(err.message);
  }else if(err.error){
    return getMsg(err.error);
  }else{
    return err.toString();
  }
};

const { addMsg } = useMsg();
const err = {
  err: (err: any) => {
    addMsg(getMsg(err), MsgType.Error);
  }
};
export default function(){
  return err;
};
