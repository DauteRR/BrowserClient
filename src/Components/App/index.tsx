import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header';
import Results from '../Results';
import { SearchParameters } from '../../types';

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  const [results, setResults] = useState<string[]>([]);

  const onSearchCallback = useCallback(async (parameters: SearchParameters) => {
    const url = 'http://localhost:3001/search';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameters)
    };

    const response = await fetch(url, options);

    const results: string[] = await response.json();

    setResults(results);
  }, []);

  return (
    <div className={classes.app}>
      <Header searchCallback={onSearchCallback} />
      <Results results={results} />
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
