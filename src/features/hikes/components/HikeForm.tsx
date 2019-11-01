import React, { ChangeEvent, FC, Fragment, ReactNode, useState } from 'react';
import { Box, Collapse, Grid, TextField } from '@material-ui/core';

import MoreToggle from '../../../components/MoreToggle';

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
  moreComponent?: () => ReactNode;
  actionComponent: ReactNode;
}

const HikeForm: FC<IHikeFormProps> = ( { hike, onUpdateHike, selectableTags, onSearchTags, selectedTags, onAddTag, onRemoveTag, moreComponent, actionComponent }) => {

  const [more,setMore] = useState(false);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md>
        <Grid container spacing={2}>
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
            {!!moreComponent &&
              <Grid item>
                <MoreToggle more={more} setMore={setMore} />
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item>
          {actionComponent}
        </Grid>
      </Grid>
      {!!moreComponent &&
        <Collapse in={more}>
          <Box pt={2}>
            {moreComponent()}
          </Box>
        </Collapse>
      }
    </Fragment>
  );
}

export default HikeForm;
