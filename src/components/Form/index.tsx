import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
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
    textField: {
      color: 'inherit'
    },
    focusedTextField: {
      color: theme.palette.primary.main
    }
  })
);

export interface FormProps {
  searchCallback: (text: SearchParameters) => void;
}

const Form: React.FC<FormProps> = props => {
  const classes = useStyles();

  const [isFocused, setIsFocused] = useState(false);

  const searchCallback = useCallback(
    debounce((text: string) => {
      props.searchCallback({ text: text });
    }, 250),
    []
  );

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <TextField
        autoComplete='off'
        fullWidth={true}
        size='small'
        name='text'
        placeholder='Search'
        variant='outlined'
        onChange={async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          await searchCallback(e.target.value);
        }}
        inputProps={{
          onBlur: () => setIsFocused(false),
          onFocus: () => setIsFocused(true)
        }}
        InputProps={{
          className: isFocused ? classes.focusedTextField : classes.textField,
          startAdornment: (
            <InputAdornment style={{ pointerEvents: 'none' }} position='start'>
              <Icon color={isFocused ? 'primary' : 'disabled'} />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default Form;
