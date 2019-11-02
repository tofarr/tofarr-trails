import React, { ChangeEvent, FC, MouseEvent, ReactNode, useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelActions,
   ExpansionPanelDetails, ExpansionPanelSummary, Grid, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import HikeTagChips from './HikeTagChips';
import IHike from '../IHike';
import ITag from '../../tags/ITag';

export interface IHikeFormProps {
  hike: IHike;
  initialExpanded?: boolean;
  onUpdateHike: (hike: IHike) => void;
  selectableTags?: ITag[];
  onSearchTags: (query: string | undefined) => void,
  selectedTags: ITag[];
  onAddTag: (tag: ITag) => void;
  onRemoveTag: (tag: ITag) => void;
  moreComponent?: () => ReactNode;
  actionComponent: ReactNode;
}

const HikeForm: FC<IHikeFormProps> = ( { hike, initialExpanded, onUpdateHike, selectableTags, onSearchTags, selectedTags, onAddTag, onRemoveTag, moreComponent, actionComponent }) => {
  console.log('HikeForm', hike.id, new Date(hike.updated_at as any));
  const [expanded, setExpanded] = useState(initialExpanded || false);

  return (
    <Box mt={expanded?1:0} mb={expanded?1:0}>
      <ExpansionPanel
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm>
              <TextField
                fullWidth
                variant="filled"
                label="Title"
                value={hike.title}
                onClick={(event:MouseEvent) => event.stopPropagation()}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onUpdateHike({...hike, title: event.target.value})} />
            </Grid>
            <Grid item xs={12} sm="auto">
              <HikeTagChips
                selectable={selectableTags}
                onSearch={onSearchTags}
                selected={selectedTags}
                onAdd={onAddTag}
                onRemove={onRemoveTag}
                />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {!!moreComponent && moreComponent()}
        </ExpansionPanelDetails>
        {actionComponent &&
          <ExpansionPanelActions>
            {actionComponent}
          </ExpansionPanelActions>
        }
      </ExpansionPanel>

    </Box>
  );
}

export default HikeForm;
