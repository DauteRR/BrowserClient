import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00838f', light: '#4fb3bf', dark: '#005662' },
    secondary: { main: '#80deea', light: '#b2ffff', dark: '#4bacb8' }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f5f5f6'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header />
    </div>
  );
};

const WrappedApp: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default WrappedApp;
