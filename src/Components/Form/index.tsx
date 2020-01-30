import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/Search';
import { useFormik } from 'formik';
import { searchFormSchema } from './SearchForm.schema';
import { SearchParameters } from '../../types';

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

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      text: ''
    } as SearchParameters,
    validationSchema: searchFormSchema,
    onSubmit(values) {
      props.searchCallback(values);
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
      <div className={classes.separator} />
      <Fab variant='round' size='large' color='primary'>
        <Icon />
      </Fab>
    </form>
  );
};

export default Form;
