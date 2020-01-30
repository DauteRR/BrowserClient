import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexGrow: 1,
      padding: '0px',
      backgroundColor: 'red'
    }
  })
);

export interface ResultsPoolProps {
  results: string[];
}

const ResultsPool: React.FC<ResultsPoolProps> = props => {
  const classes = useStyles();

  return (
    <>
      {props.results.map((result, index) => (
        <Typography key={index}>{result}</Typography>
      ))}
    </>
    // <Container className={classes.container} maxWidth='md'>

    // </Container>
  );
};

export default ResultsPool;
