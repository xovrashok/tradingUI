import React, { useState } from 'react';

import SnackbarContext from '../contects/SnackbarContext';

const SnackbarProvider = (props) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  let timer;

  const closeSnackbar = () => {
    clearTimeout(timer);
    setIsOpen(false);
  };

  const openSnackbar = (msg) => {
    setMessage(msg);
    setIsOpen(true);
    timer = setTimeout(closeSnackbar, 4000); // close snackbar after 3 seconds
  };

  return (
    <SnackbarContext.Provider
      value={{
        message,
        isOpen,
        openSnackbar,
        closeSnackbar,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
