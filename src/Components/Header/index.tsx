import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Paper, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import Form from '../Form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2)
      }
    },
    title: {
      textAlign: 'center',
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.primary.main,
      padding: theme.spacing(4) + 'px ' + theme.spacing(2) + 'px',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1) + 'px ' + theme.spacing(1) + 'px'
      }
    },
    form: {
      padding: theme.spacing(4) + 'px 0px',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1) + 'px ' + theme.spacing(1) + 'px'
      }
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={classes.container} maxWidth='md'>
      <Container className={classes.title}>
        <Typography variant={matches ? 'h4' : 'h3'}>Data Acquisition and Integration</Typography>
      </Container>
      <Container className={classes.form}>
        <Form />
      </Container>
    </Container>
  );
};

export default Header;
