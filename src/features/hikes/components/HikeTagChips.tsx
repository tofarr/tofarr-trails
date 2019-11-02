import React, { FC, MouseEvent, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, MenuList, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { isDark } from '../../../services/ColorService';
import ListGrow from '../../../components/ListGrow';
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
    return <ListGrow items={selected} component={renderRemoveButton} />
  }

  function renderRemoveButton(tag: ITag){
    return <Grid item key={tag.id}>
      <Button
        variant="contained"
        style={{backgroundColor: tag.color, color: isDark(tag.color) ? 'white' : 'black'}}
        onClick={(event:MouseEvent) => {
          event.stopPropagation();
          onRemove(tag);
        }}>
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
      <MenuItem key={tag.id} onClick={(event:MouseEvent) => {
        event.stopPropagation();
        onAdd(tag)
      }}>
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

  function handleOpen(event:MouseEvent){
    event.stopPropagation();
    setOpen(true);
    if(!selectable){
      onSearch(undefined);
    }
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      {renderSelected()}
      {renderAddButton()}
      {renderDialog()}
    </Grid>
  );
}

export default IHikeTagChips;
