import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Timestamp from '../../../components/Timestamp';

import IHike from '../IHike';
import { destroyHike, updateHike, readHike } from '../HikeService';
import HikeForm from '../components/HikeForm';
import IHikeTag from '../../hikeTags/IHikeTag';
import { listTags, readAllTags } from '../../tags/TagService';
import { createHikeTag, destroyHikeTag, listHikeTags } from '../../hikeTags/HikeTagService';
import { createPoint } from '../../points/PointService';
import ITag from '../../tags/ITag';
import PointsContainer from '../../points/containers/PointsContainer';
import PointGraphContainer from '../../points/containers/PointGraphContainer';

export interface IHikeContainerProps{
  hike: IHike;
  afterDestroy?: (hike:IHike) => void;
  afterUpdate?: (hike:IHike) => void;
}

const UpdateHikeContainer: FC<IHikeContainerProps> = (props) => {
  const { afterUpdate, afterDestroy } = props
  const [hike, setHike] = useState<IHike>(props.hike);
  const hikeId = hike.id as number;
  const [selectableTags,setSelectableTags] = useState<ITag[]|undefined>(undefined);
  const [selectedTags,setSelectedTags] = useState<ITag[]|undefined>(undefined);
  const [recordId,setRecordId] = useState<number|undefined>(undefined);

  useEffect(() => {
    listHikeTags(hikeId).then((hikeTags: IHikeTag[]) => {
      readAllTags(hikeTags.map(hikeTag => hikeTag.tag_id)).then(setSelectedTags)
    });
  }, [hikeId]);

  function handleSearchTags(){
    listTags().then(setSelectableTags);
  }

  function handleUpdate(_hike: IHike){
    updateHike(_hike).then(()=>{
      setHike(_hike);
      if(afterUpdate){
        afterUpdate(hike);
      }
    });
  }

  function handleDestroy(){
    if(recordId){
      navigator.geolocation.clearWatch(recordId);
      setRecordId(undefined);
    }
    destroyHike(hike.id as number).then(()=>{
      if(afterDestroy){
        afterDestroy(hike);
      }
    });
  }

  function handleAddTag(tag:ITag){
    createHikeTag(hike.id as number, tag.id as number).then(() => {
      let newTags = (selectedTags || []).slice();
      newTags.push(tag);
      setSelectedTags(newTags);
      readHike(hike.id as number).then(setHike);
    });
  }

  function handleRemoveTag(tag: ITag){
    destroyHikeTag(hike.id as number, tag.id as number).then(() => {
      if(selectedTags){
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
        readHike(hike.id as number).then(setHike);
      }
    });
  }

  function handleRecording(){
    if(recordId){
      navigator.geolocation.clearWatch(recordId);
      setRecordId(undefined);
      return;
    }else{
      setRecordId(navigator.geolocation.watchPosition(handlePosition));
    }
  }

  function handlePosition(position:Position){
    const { coords } = position;
    createPoint({
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      hike_id: hike.id as number
    })
  }

  function handleUpdated(hike_id:number){
    if(afterUpdate){
      readHike(hike_id).then((hike) => {
        (afterUpdate as (hike:IHike) => void)(hike);
      })
    }
  }

  function renderActionComponent(){
    return (
      <Button color="secondary" variant="contained" onClick={() => handleDestroy()}>
        <DeleteIcon />
        Delete Hike
      </Button>
    )
  }

  function renderMoreComponent(){
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm>
              <Timestamp label="Created At" value={hike.created_at} />
            </Grid>
            <Grid item xs={12} sm>
              <Timestamp label="Updated At" value={hike.updated_at} />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={recordId ? "secondary" : "default"}
                onClick={handleRecording}>
                <Checkbox checked={!!recordId} />
                Record
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Points</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                <Grid item xs>
                  <PointsContainer
                    hike_id={hike.id as number}
                    afterUpdated={(hike_id:number) => handleUpdated(hike_id)} />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Graph</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
                <PointGraphContainer hike_id={hike.id as number} />
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }

  return (
    <HikeForm
      hike={hike}
      onUpdateHike={handleUpdate}
      selectableTags={selectableTags}
      onSearchTags={handleSearchTags}
      selectedTags={selectedTags || []}
      onAddTag={handleAddTag}
      onRemoveTag={handleRemoveTag}
      actionComponent={renderActionComponent()}
      moreComponent={renderMoreComponent} />
  );
}

export default UpdateHikeContainer;
