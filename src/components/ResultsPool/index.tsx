import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';
import ResultCard from '../ResultCard';
import { Result } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexGrow: 1,
      padding: '0px',
      flexDirection: 'column'
    }
  })
);

export interface ResultsPoolProps {
  results: Result[];
}

const ResultsPool: React.FC<ResultsPoolProps> = props => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='md'>
      {props.results.map((result, index) => (
        <ResultCard key={index} {...result} />
      ))}
    </Container>
  );
};

export default ResultsPool;
