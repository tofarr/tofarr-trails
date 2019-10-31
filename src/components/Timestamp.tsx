import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

interface ITimestampProps{
  label: string;
  value?: number;
}

const Timestamp: FC<ITimestampProps> = ({ label, value }) => {

  function pad(n:number){
    return (n < 10) ? `0${n}` : n.toString();
  }

  function renderValue(){
    if(!value){
      return null;
    }
    const date = new Date(value);
    return [
      date.getFullYear().toString(),
      '-',
      pad(date.getMonth()),
      '-',
      pad(date.getDate()),
      ' ',
      pad(date.getHours()),
      ':',
      pad(date.getMinutes()),
      ':',
      pad(date.getSeconds())
    ].join('');

  }

  return <TextField
    fullWidth
    disabled
    variant="filled"
    label={label}
    value={renderValue()} />
}

export default Timestamp;
