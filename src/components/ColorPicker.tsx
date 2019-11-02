import React, { ChangeEvent, FC, FocusEvent, Fragment, MouseEvent, useState } from 'react';
import { Button } from '@material-ui/core';
import { uniqueId } from 'lodash';
import PaletteIcon from '@material-ui/icons/Palette';

import { isDark } from '../services/ColorService';

export interface IColorPickerProps{
  className?: string;
  name?: string;
  onChange?: (name: string) => void;
  value?: string;
  variant?: "contained" | "text" | "outlined" | undefined;
}


const ColorPicker: FC<IColorPickerProps> = ({ className, name, value, variant, onChange}) => {

  const [pickerId] = useState(uniqueId('colorPicker'));
  const textColor = value && isDark(value) ? 'white' : 'black';

  return (
    <Fragment>
      <input
        id={pickerId}
        type="color"
        name={name}
        value={value}
        style={{ display: 'none '}}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if(onChange){
            onChange(event.target.value)
          }
        }} />
      <Button
        className={className}
        name={name}
        variant={variant}
        style={{backgroundColor: value, color: textColor}}
        onClick={(event: MouseEvent) => {
          event.stopPropagation();
          (document.querySelector('#'+pickerId) as HTMLInputElement).click();
        }}
        onFocus={(event: FocusEvent) => {
          event.stopPropagation();
        }}>
          <PaletteIcon />
      </Button>
    </Fragment>
  );
}

ColorPicker.defaultProps = {
  value: '#000',
  variant: 'contained'
}

export default ColorPicker;
