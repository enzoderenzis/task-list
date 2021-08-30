import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import TaskDetail from './TaskDetail';
import { server } from './config';

const fetchOptions = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
};

const fakeEndpoint = `${server}/tasks`;
const dbEndpoint = `${server}/api/tasks`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function TaskList({ size = 3, useDBApi = false }) {
  const classes = useStyles();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${useDBApi ? dbEndpoint : fakeEndpoint}?size=${size}`, fetchOptions).then(res => res.json());
      setTasks(response.tasks);
      setCompletedTasks(response.tasks.filter(t => t.status === 'COMPLETED').map(t => t.uuid));
      setLoading(false);
    })();
  }, [size, useDBApi]);

  return (
    <>

    {loading ? <CircularProgress />
    :
    <div className={classes.root}>
     {tasks.map((item, idx) => <Paper key={idx} elevation={3} onClick={() => setTaskDetail(item)} style={{backgroundColor: completedTasks.includes(item.uuid) ? 'green' : ''}} >
                                   <Typography className={classes.title} color="textSecondary" gutterBottom>
                                     {item.title}
                                   </Typography>
                               </Paper>)
     }
     {taskDetail && <TaskDetail useDBApi={useDBApi} task={taskDetail} onClosed={() => setTaskDetail(null)} onCompleted={ (id) => setCompletedTasks([...completedTasks, id]) } />}
     </div>
     }
     </>
  )
}
