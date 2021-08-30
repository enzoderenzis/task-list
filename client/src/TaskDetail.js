import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { server } from './config';
const fetchOptions = {
  method: 'PUT',
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    padding: theme.spacing(2),
  }
}));

const fakeEndpoint = `${server}/task`;
const dbEndpoint = `${server}/api/task`;


export default function TaskDetail({ task, onCompleted = () => {}, onClosed = () => {}, useDBApi = false }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);


  const handleClose = () => {
    setOpen(false);
    onClosed();
  };

  const completeTask = async () => {
      setLoading(true);
      await fetch(`${useDBApi ? dbEndpoint : fakeEndpoint}/${task.uuid}`, fetchOptions);

      setTimeout(() => { // for emule heavy backend process
        onCompleted(task.uuid);
        setLoading(false);
        handleClose();
      }, 700);
  }


  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Task ID: {task.uuid}</h3>
            <p id="transition-modal-description">{task.title}</p>
            <div className={classes.buttons} >
              <Button disabled={loading} variant="contained" color="primary" onClick={completeTask} >
                Complete
                {loading && <CircularProgress />}
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
  );
}
