import React, { FC } from 'react';
import { IMsg } from '../services/MsgService';

interface IMsgsProps{
  msgs: IMsg[];
}

const Msgs: FC<IMsgsProps> = ({ msgs }) => (
  <ul>
    {msgs.map( msg => <li key={msg.timestamp.getTime()}>{msg.msg}</li>)}
  </ul>
);

export default Msgs;
