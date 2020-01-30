import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import Form from '../Form';
import { SearchParameters, Info } from '../../types';

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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main,
      padding: theme.spacing(3) + 'px ' + theme.spacing(2) + 'px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1) + 'px ' + theme.spacing(1) + 'px'
      }
    },
    infoBox: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    infoNumber: {
      fontSize: '22px'
    },
    toVisit: {
      color: 'orange'
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

export interface HeaderProps {
  searchCallback: (text: SearchParameters) => void;
  info: Info;
}

const Header: React.FC<HeaderProps> = props => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={classes.container} maxWidth='md'>
      <Container className={classes.title}>
        <Typography variant={matches ? 'h4' : 'h3'}>Data Acquisition and Integration</Typography>
      </Container>
      <Container className={classes.infoBox}>
        <Typography variant='h6'>
          <Typography display={'inline'} color='primary' className={classes.infoNumber}>
            {props.info.visitedCount}
          </Typography>{' '}
          pages registered
        </Typography>
        <Typography variant='h6'>
          <Typography
            display={'inline'}
            className={[classes.toVisit, classes.infoNumber].join(' ')}
          >
            {props.info.notVisitedCount}
          </Typography>{' '}
          pages to visit
        </Typography>
        <Typography variant='h6'>
          <Typography display={'inline'} color='error' className={classes.infoNumber}>
            {props.info.errorCount}
          </Typography>{' '}
          errors visiting pages
        </Typography>
      </Container>
      <Container className={classes.form}>
        <Form searchCallback={props.searchCallback} />
      </Container>
    </Container>
  );
};

export default Header;
