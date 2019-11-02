import React, { ChangeEvent, FC, Fragment, ReactNode,
   SyntheticEvent, useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelActions,
   ExpansionPanelDetails, ExpansionPanelSummary,
   Grid, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ColorPicker from '../../../components/ColorPicker';
import Timestamp from '../../../components/Timestamp';

import ITag from '../ITag';

export interface ITagFormProps {
  tag: ITag;
  onUpdateTag: (tag: ITag) => void;
  initialExpanded?: boolean;
  actionComponent: ReactNode;
}

const TagForm: FC<ITagFormProps> = ( { tag, onUpdateTag, initialExpanded, actionComponent }) => {

  const [expanded, setExpanded] = useState(initialExpanded || false);

  function handleFocus(event:SyntheticEvent){
    event.stopPropagation();
    setExpanded(true);
  }

  return (
    <Box mt={expanded?1:0} mb={expanded?1:0}>
      <ExpansionPanel
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                variant="filled"
                label="Title"
                value={tag.title}
                onClick={handleFocus}
                onFocus={handleFocus}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onUpdateTag({...tag, title: event.target.value})} />
            </Grid>
            <Grid item>
              <ColorPicker
                value={tag.color}
                onChange={(color: string) =>
                  onUpdateTag({...tag, color})} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={2}>
            {!!tag.id &&
              <Fragment>
                <Grid item xs={12} sm={6}>
                  <Timestamp label="Created At" value={tag.created_at} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Timestamp label="Updated At" value={tag.updated_at} />
                </Grid>
              </Fragment>
            }
            <Grid item xs>
              <TextField
                fullWidth
                multiline
                variant="filled"
                label="Description"
                value={tag.description}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onUpdateTag({...tag, description: event.target.value})} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        {!!actionComponent && <ExpansionPanelActions>
          {actionComponent}
        </ExpansionPanelActions>}
      </ExpansionPanel>
    </Box>
  );
}

export default TagForm;
