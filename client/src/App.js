import React, {useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TaskList from './TaskList';

const DEFAULT = 3;

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [listSize, setListSize] = useState(DEFAULT);
  const [dbApi, setDbApi] = useState(false);
  return (
    <div className="App">
    <Container maxWidth="md" className={classes.root}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Fake API</Grid>
          <Grid item>
            <Switch checked={dbApi} onChange={() => setDbApi(!dbApi)} name="checkedC" />
          </Grid>
          <Grid item>DB API</Grid>
        </Grid>
      </Typography>
      <Typography variant="h4" className={classes.title}>
        Tasks
      </Typography>
      <Slider
          defaultValue={DEFAULT}
          ariaValueText={"Task List Size"}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={DEFAULT}
          marks
          min={DEFAULT}
          max={30}
          onChange={(e, value) => setListSize(value)}

        />
      <TaskList size={listSize} useDBApi={dbApi} />
    </Container>
    </div>
  );
}

export default App;
