import React, { useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/Search';
import { SearchParameters } from '../../types';
import debounce from 'lodash.debounce';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center'
    },
    separator: {
      padding: theme.spacing(1),
      width: '0px',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5)
      }
    },
    textField: {
      flexGrow: 1
    }
  })
);

export interface FormProps {
  searchCallback: (text: SearchParameters) => void;
}

const Form: React.FC<FormProps> = props => {
  const classes = useStyles();

  const searchCallback = useCallback(
    debounce((text: string) => {
      props.searchCallback({ text: text });
    }, 500),
    []
  );

  return (
    <form className={classes.form}>
      <TextField
        className={classes.textField}
        name='text'
        label='Search'
        variant='outlined'
        onChange={async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          await searchCallback(e.target.value);
        }}
      />
      <div className={classes.separator} />
      <Fab type='submit' variant='round' size='large' color='primary'>
        <Icon />
      </Fab>
    </form>
  );
};

export default Form;
