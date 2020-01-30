import React, { useCallback, useState, ReactNode } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Card, CardMedia, Container, CardActionArea } from '@material-ui/core';
import {
  Person,
  Language,
  LocationOn,
  Description,
  BusinessCenter,
  CalendarToday,
  Link,
  VpnKey
} from '@material-ui/icons';
import { Result } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
      }
    },
    actionArea: {
      padding: theme.spacing(4)
    },
    title: {
      margin: '0px',
      marginBottom: theme.spacing(2),
      padding: '0px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
      height: 16,
      width: 16,
      marginRight: theme.spacing(1)
    },
    item: {
      padding: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
      fontSize: 20
    }
  })
);

interface ItemProps {
  iconName: ReactNode;
  value?: string;
}

const Item: React.FC<ItemProps> = props => {
  const classes = useStyles();
  const { iconName, value } = props;
  return value ? (
    <Container className={classes.item}>
      {iconName}
      <Typography noWrap variant='subtitle2'>
        {value}
      </Typography>
    </Container>
  ) : (
    <></>
  );
};

export interface ResultCardProps extends Result {}

const ResultCard: React.FC<ResultCardProps> = props => {
  const classes = useStyles();

  const { title, url, lastVisited, meta } = props;
  const [date] = useState(new Date(lastVisited));
  const [height, setHeight] = useState(0);

  const onClickCallback = useCallback(() => {
    window.location.href = url;
  }, [url]);

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.actionArea} onClick={onClickCallback}>
        <Container className={classes.title}>
          <CardMedia
            className={classes.image}
            title='favicon'
            image={`http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
          ></CardMedia>
          <Typography color='primary' noWrap variant='h5'>
            {title}
          </Typography>
        </Container>
        <Item iconName={<Link className={classes.icon} />} value={url} />
        <Item iconName={<CalendarToday className={classes.icon} />} value={date.toLocaleString()} />
        <Item iconName={<Description className={classes.icon} />} value={meta.description} />
        <Item
          iconName={<VpnKey className={classes.icon} />}
          value={meta.keywords?.join(', ').slice(0, -2)}
        />
        <Item iconName={<Person className={classes.icon} />} value={meta.author} />
        <Item iconName={<Language className={classes.icon} />} value={meta.lang} />
        <Item iconName={<LocationOn className={classes.icon} />} value={meta.locality} />
        <Item iconName={<BusinessCenter className={classes.icon} />} value={meta.organization} />
      </CardActionArea>
    </Card>
  );
};

export default ResultCard;
