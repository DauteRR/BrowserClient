import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Typography variant='h1'>Browser</Typography>
      <Button variant='outlined'>Navigate</Button>
    </div>
  );
};

export default App;
