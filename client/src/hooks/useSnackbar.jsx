import { useContext } from 'react';

import SnackbarContext from '../contects/SnackbarContext';

const useSnackbar = () => {
  const { message, isOpen, openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  return { message, isOpen, openSnackbar, closeSnackbar };
};

export default useSnackbar;
