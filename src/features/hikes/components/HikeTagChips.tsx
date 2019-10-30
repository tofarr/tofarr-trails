import React, { FC, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, MenuList, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { isDark } from '../../../services/ColorService';
import ITag from '../../tags/ITag';

export interface IHikeTagChipsProps {
  selectable?: ITag[];
  onSearch: (query: string | undefined) => void,
  selected: ITag[];
  onAdd: (tag: ITag) => void;
  onRemove: (tag: ITag) => void;
}

const IHikeTagChips: FC<IHikeTagChipsProps> = ({ selectable, onSearch, selected, onAdd, onRemove }) => {

  const [open, setOpen] = useState(false);

  function renderSelected(){
    return selected.map(renderRemoveButton);
  }

  function renderRemoveButton(tag: ITag){
    return <Grid item key={tag.id}>
      <Button
        variant="contained"
        style={{backgroundColor: tag.color, color: isDark(tag.color) ? 'white' : 'black'}}
        onClick={() => onRemove(tag)}>
        {tag.title}
        <DeleteIcon />
      </Button>
    </Grid>
  }

  function renderAddButton(){
    return (
      <Grid item>
        <Button
          variant="contained"
          onClick={handleOpen}>
          Tags
          <AddIcon />
        </Button>
      </Grid>
    );
  }

  function renderSelectable(tag: ITag){
    return (
      <MenuItem key={tag.id} onClick={() => onAdd(tag)}>
        {tag.title}
      </MenuItem>
    )
  }

  function renderDialog(){
    if(!open){
      return null;
    }
    return (
      <Dialog
        onClose={() => setOpen(false)}
        open={open}>
        <DialogTitle>Select Tags</DialogTitle>
        <DialogContent>
          {renderMenu()}
        </DialogContent>
      </Dialog>
    );
  }

  function renderMenu(){
    const tagsToRender = selectable ? selectable.filter((tag) => {
      return !selected.find(selectedTag => selectedTag.id === tag.id)
    }) : [];
    if(!tagsToRender.length){
      return <Typography color="error">No Tags Available</Typography>;
    }
    return (
      <MenuList>
        {tagsToRender.map(renderSelectable)}
      </MenuList>
    );
  }

  function handleOpen(){
    setOpen(true);
    if(!selectable){
      onSearch(undefined);
    }
  }

  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={2}>
          {renderSelected()}
          {renderAddButton()}
          {renderDialog()}
        </Grid>
      </Box>
    </Paper>
  );
}

export default IHikeTagChips;
