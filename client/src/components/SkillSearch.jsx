import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FixedSizeList as List } from 'react-window';
import skillsList from '../utils/skillsList';

const Row = ({ index, style }) => (
  <div style={style}>{skillsList[index]}</div>
);

const ListBox = () => (
  <List
    height={150}
    itemCount={51514}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);

function SkillSearch() {
  return (
    <ListBox />
  );
  // return (
  //   <Autocomplete
  //     style={{ width: 300 }}
  //     renderInput={(params) => (
  //       <TextField {...params} label="Skills" variant="outlined" fullWidth />
  //     )}
  //   />
  // );
}

export default SkillSearch;
