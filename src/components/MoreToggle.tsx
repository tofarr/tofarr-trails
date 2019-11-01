import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

interface IProps{
  more: boolean;
  setMore: (more:boolean) => void;
  moreLabel?: string;
  lessLabel?: string;
}

const MoreToggle: FC<IProps> = ({ more, setMore, moreLabel, lessLabel}) => (
  <Button variant="contained" onClick={()=> setMore(!more)}>
    {more ? lessLabel : moreLabel}
    {more ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
  </Button>
);

MoreToggle.defaultProps = {
  moreLabel: "More...",
  lessLabel: "Less..."
}

export default MoreToggle;
