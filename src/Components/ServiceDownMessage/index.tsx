import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0px'
    },
    typography: {
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

export interface ServiceDownMessageProps {}

const ServiceDownMessage: React.FC<ServiceDownMessageProps> = props => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='md'>
      <Typography className={classes.typography} variant='h5' color='error'>
        <Icon className={classes.icon} fontSize='large' />
        Server seems to be down
      </Typography>
    </Container>
  );
};

export default ServiceDownMessage;
