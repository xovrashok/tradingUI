import React from 'react';

const SnackbarContext = React.createContext({
  message: '',
  isOpen: false,
  openSnackbar: () => null,
  closeSnackbar: () => null,
});

export default SnackbarContext;
