import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header';
import ResultsPool from '../ResultsPool';
import { SearchParameters, Result } from '../../types';
import ServiceDownMessage from '../ServiceDownMessage';
import { useInterval } from '../../hooks/useInterval';

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

  const [results, setResults] = useState<Result[]>([]);

  const [serviceDown, setServiceDown] = useState<boolean>(false);

  useInterval(() => {
    const url = 'http://localhost:3001/ping';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(url, options)
      .then(async response => {
        const results = await response.json();
        if (results['ping'] && results['ping'] === 'pong') {
          setServiceDown(false);
        }
      })
      .catch(() => setServiceDown(true));
  }, 5000);

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

    fetch(url, options)
      .then(async response => {
        const results: Result[] = await response.json();
        setResults(results);
      })
      .catch(error => {
        setServiceDown(true);
      });

    // const results: string[] = await response.json();
  }, []);

  return (
    <div className={classes.app}>
      <Header searchCallback={onSearchCallback} />
      {serviceDown ? <ServiceDownMessage /> : <ResultsPool results={results} />}
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
