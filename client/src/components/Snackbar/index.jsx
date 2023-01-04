import React from 'react';

import useSnackbar from '../../hooks/useSnackbar';
import classes from './Snackbar.module.css';

const Snackbar = () => {
  const { isOpen, message } = useSnackbar();

  return <div className={`${classes.snackbar} ${isOpen ? classes.snackbarOpen : ''}`}>{message}</div>;
};
export default Snackbar;
