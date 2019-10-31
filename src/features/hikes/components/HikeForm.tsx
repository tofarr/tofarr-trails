import React, { ChangeEvent, FC } from 'react';
import { Grid, TextField } from '@material-ui/core';

import HikeTagChips from './HikeTagChips';
import IHike from '../IHike';
import ITag from '../../tags/ITag';

export interface IHikeFormProps {
  hike: IHike;
  onUpdateHike: (hike: IHike) => void;
  selectableTags?: ITag[];
  onSearchTags: (query: string | undefined) => void,
  selectedTags: ITag[];
  onAddTag: (tag: ITag) => void;
  onRemoveTag: (tag: ITag) => void;
}

const HikeForm: FC<IHikeFormProps> = ( { hike, onUpdateHike, selectableTags, onSearchTags, selectedTags, onAddTag, onRemoveTag, children }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md>
        <TextField
          fullWidth
          variant="filled"
          label="Title"
          value={hike.title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onUpdateHike({...hike, title: event.target.value})} />
      </Grid>
      <Grid item xs={12} sm={12} md>
        <HikeTagChips
          selectable={selectableTags}
          onSearch={onSearchTags}
          selected={selectedTags}
          onAdd={onAddTag}
          onRemove={onRemoveTag}
          />
      </Grid>
      {!!children &&
        <Grid item>
          {children}
        </Grid>
      }
    </Grid>
  );
}

export default HikeForm;
