import React, { useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Container, Paper, Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/Search';
import { useFormik } from 'formik';
import { searchFormSchema } from './SearchForm.schema';

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

const Form: React.FC = () => {
  const classes = useStyles();

  const onClickCallback = useCallback(text => {
    const url = 'http://localhost:3001/search';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    };

    return fetch(url, options);
  }, []);

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: searchFormSchema,
    async onSubmit(values) {
      const response = await onClickCallback(values.text);

      const returned = await response.json();

      console.log(returned);
    }
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        name='text'
        label='Search'
        variant='outlined'
        onChange={handleChange}
      />
      <Container className={classes.separator} />
      <Fab variant='round' size='large' color='primary'>
        <Icon />
      </Fab>
    </form>
  );
};

export default Form;
